import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
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

  constructor(private userService : UserService, private router : Router, private matBottomSheetRef : MatBottomSheetRef) {
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
        this.matBottomSheetRef.dismiss();
        if(this.userService.isAdmin()) {
          this.router.navigateByUrl('/admin-landing');
        } else {
          this.router.navigateByUrl('/postfeed');
        }

    }, error => {
        console.log("login failure");
    });
  }

  // close bottom sheet on button press
}
