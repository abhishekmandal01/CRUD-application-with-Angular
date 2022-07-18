import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '@app/models/user';
import { PeriodicElement } from '@app/models/PeriodicElement';

@Injectable({ providedIn: 'root' })

export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

   empData: PeriodicElement[] = [
      {id: 1, firstname: 'Rohit', lastname: "S", empId: 'MI'},
      {id: 2, firstname: 'Shikar', lastname: "D", empId: 'DC'},
      {id: 3, firstname: 'Rishab', lastname: "P", empId: 'LK'},
      {id: 4, firstname: 'Shreyas', lastname: "I", empId: 'KKR'},
      {id: 5, firstname: 'Mahendra', lastname: "D", empId: 'CSK'},
      {id: 6, firstname: 'Sachin', lastname: "T", empId: 'RR'},
      {id: 7, firstname: 'Saurav', lastname: "G", empId: 'BCCI'},
      {id: 8, firstname: 'Zaheer', lastname: "K", empId: 'DC'},
      {id: 9, firstname: 'Robin', lastname: "U", empId: 'GI'},
    ];

    constructor(private router: Router, private http: HttpClient)
    {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username:any, password:any) {
        return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    public getAll()
    {
        return this.empData;
    }

    getById(id: number) {
        return this.empData.find(x => x.id = id);
    }

    update(id:any, params:any) {
        return 1;
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }

}
