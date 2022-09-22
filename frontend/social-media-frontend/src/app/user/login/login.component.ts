import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPayload } from '../login-payload';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loginPayload : LoginPayload;

  constructor(private userService : UserService, private router : Router) {
    this.loginForm = new FormGroup({
      username : new FormControl(),
      password : new FormControl()
    });
    this.loginPayload = {
      username : '',
      password : ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm != null && this.loginPayload != null) {
      this.loginPayload.username = this.loginForm.get('username')!.value;
      this.loginPayload.password = this.loginForm.get('password')!.value;
    }
    console.log(this.loginPayload.username + ": " + this.loginPayload.password);
    this.userService.login(this.loginPayload).subscribe(data => {
        console.log("login success");
        this.router.navigateByUrl('/home');
    }, error => {
        console.log("login failure");
    });
  }
}
