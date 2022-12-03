import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import * as data from '../../assets/json/user.json';

import { User } from '../model/user';

@Injectable()
export class AuthService {

    isloggedIn: boolean = false;

    isloggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    userList: any = (data as any).default;


    constructor() { }
    isUserAuthenticated(username: string, password: string): Observable<boolean> {
        this.userList
            .map((users: User) => {
                let user = (users.userName === username) && (users.password === password);
                if (user) {
                    this.isloggedIn = true;
                } else {
                    this.isloggedIn = false;
                }

            });
        this.isloggedIn$.next(this.isloggedIn);
        return of(this.isloggedIn);
    }

    isUserLoggedIn(): boolean {
        this.isloggedIn$.next(this.isloggedIn);
        return this.isloggedIn;
    }


}