import { Injectable } from '@angular/core';
import { Iuser } from '../interface/IResponse';
import { EncryptServiceService } from '../encrypt-service.service';

@Injectable({
    providedIn: 'root'
})

export class UserServiceService {
  private user : Iuser;
  constructor(private encdec: EncryptServiceService) { }

  getUser(): Iuser{
    this.user = JSON.parse(this.encdec.get('123456$#@$^@1ERF',sessionStorage.getItem('auth')));
    return this.user;
  }
}