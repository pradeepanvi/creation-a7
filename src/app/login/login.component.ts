import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit(){
    this.router.navigate(['invoice'], {relativeTo:this.route});
  }

  private initForm(){
    this.loginForm = new FormGroup({
      'user' : new FormControl('', Validators.required),
      'password' : new FormControl('', Validators.required)
    })    
  }

}
