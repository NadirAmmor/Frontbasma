import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    private url = environment.baseUrl;
    private _User: User;
    private _ListUser: Array<User>;
    private _submitted: boolean;
  constructor(private http: HttpClient) { }
    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }
    get User(): User {
        if (this._User == null) {
            this._User = new User();
        }
        return this._User;
    }

    set User(value: User) {
        this._User = value;
    }

    get ListUser(): Array<User> {
        if (this._ListUser == null) {
            this._ListUser = new Array<User>();
        }
        return this._ListUser;
    }

    set ListUser(value: Array<User>) {
        this._ListUser = value;
    }
    public saveUser(): Observable<number> {
        return this.http.post<number>(this.url+'admin/', this.User);
    }
    public Login(user: string,pass: string): Observable<User> {
        return this.http.get<User>(this.url+'admin/user/sign-in/'+user+'/'+pass);
    }
}
