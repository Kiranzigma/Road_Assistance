import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IResponse } from '../app/interface/IResponse';
import { UserServiceService } from './shared/user-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private userService: UserServiceService) { }
    canActivate(route : ActivatedRouteSnapshot) {
        if (this.isExpired() == false && this.checkUserFunc(route)) {
            return true;
        } else {
            this.router.navigate(['/login'])
            return false;
        }
    }
    checkUserFunc(route){
    let checkUser: Boolean = true;
            const validUserType = route.data.expectedRole;
            if(validUserType != undefined){
                let userData = this.userService.getUser();
                if(userData?.userType != validUserType){                    
                        checkUser = false;
                }    
            }
            return checkUser;
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
