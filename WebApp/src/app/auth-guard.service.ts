import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IResponse } from '../app/interface/IResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (this.isExpired() == false) {
            return true;
        } else {
            this.router.navigate(['/login'])
            return false;
        }
    }
    isExpired() {
        const helper = new JwtHelperService();
        let t: IResponse = JSON.parse(sessionStorage.getItem('jwt_token'));
        if (t != null) {
            return helper.isTokenExpired(t.token);
        }
        else {
            return true;
        }
    }
}
