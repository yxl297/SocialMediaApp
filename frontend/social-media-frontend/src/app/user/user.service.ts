import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable } from 'rxjs';
import { User } from '../payload/user';
import { JwtAuthResponse } from './jwt-auth-response';
import { LoginPayload } from './login-payload';
import { RegisterPayload } from './register-payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = "http://localhost:8080/api/v1/users/";

  constructor(private httpClient: HttpClient, private localStorageService : LocalStorageService) { }

  register(registerPayload : RegisterPayload) : Observable<any> {
    return this.httpClient.post(this.url + "register", registerPayload);
  }

  login(loginPayload : LoginPayload) : Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse> (this.url + 'login', loginPayload).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      this.localStorageService.store('isAdmin', data.isAdmin);
      return true;
    }));
  }

  isAuthenticated() : Boolean {
    return this.localStorageService.retrieve('username') != null;
  }

  isAdmin() : Boolean {
    return this.localStorageService.retrieve('isAdmin');
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
    this.localStorageService.clear('isAdmin');
  }

  public findAll() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "admin/all");

  }

  update(user : User) {
    return this.httpClient.put<User>(this.url + "admin/update/" + user.uid, user);
  }

  delete(id : any) {
    return this.httpClient.delete(this.url + "admin/delete/" + id);
  }

}
