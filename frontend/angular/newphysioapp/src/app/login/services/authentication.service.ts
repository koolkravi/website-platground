import { Injectable } from '@angular/core';
import { User } from '../model/user'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticateUser(user:User){
    let UserArray=[];
    if(localStorage.getItem('Users')){
      UserArray=JSON.parse(localStorage.getItem('Users') || '{}');
    }
    return UserArray.find((p: { username: string; password: string; })=> p.username===user.username && p.password===user.password);
  }
}
