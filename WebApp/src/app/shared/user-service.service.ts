import { Injectable } from '@angular/core';
import { Iuser } from '../interface/IResponse';

@Injectable()

export class UserServiceService {

  constructor() { }

  user : Iuser;
  
  setUser(userObj: Iuser){
    this.user = userObj;
  }
  getUser(): Iuser{
    return this.user;
  }
}
