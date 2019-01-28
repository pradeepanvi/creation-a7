import { HttpClient } from '@angular/common/http';
import { Injectable, DoCheck } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService implements DoCheck {
    //code = "http://localhost:4200/assets/code.json";
    code = "http://identitycards.co.in/invoice/assets/code.json";
    loggedIn = false;
    user_detail:any;

    constructor(private http:HttpClient){
        
    }

    ngDoCheck(){
    }

    isAuthenticated(){
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn)
                }, 800);
            }
        )
        return promise;
    }

    login(user, pass) {
        this.http.get(this.code).subscribe(
            (res) => {
                this.user_detail = res;
            }
        )
        //console.log(this.user_detail);
        if(this.user_detail.user_detail.user == user && this.user_detail.user_detail.password == pass){
            this.loggedIn = true;
        }
    }

    logout(){
        this.loggedIn = false;
    }
}