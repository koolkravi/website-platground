import { Injectable } from '@angular/core';

import { Registration }from  '../model/registration'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(registrationModel:Registration){

    let users=[];
    if(localStorage.getItem('Users')){
      users=JSON.parse(localStorage.getItem('Users') || '{}');
      users=[users,...users]
    } else{
      users=[registrationModel]
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }
}
