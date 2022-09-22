import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPayload } from '../register-payload';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder : FormBuilder, private userService : UserService, private router : Router) {
    this.registerForm = this.formBuilder.group({
      username:'',
      email:'',
      password:'',
      confirmPassword:''
    });
    this.registerPayload = {
      username:'',
      email:'',
      password:'',
      confirmPassword:''
    };
   }

  ngOnInit() {
  }

  onSubmit() {


    if (this.registerForm != null && this.registerPayload != null) {
      this.registerPayload.username = this.registerForm.get('username')!.value;
      this.registerPayload.email = this.registerForm.get('email')!.value;
      this.registerPayload.password = this.registerForm.get('password')!.value;
      this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword')!.value;

      this.userService.register(this.registerPayload).subscribe(data => {
        console.log("register success");
        this.router.navigateByUrl('/register-success');
      }, error => {
        console.log("register failure");
      });
    }

  }

}
