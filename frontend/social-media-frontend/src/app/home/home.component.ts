import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private matBottomSheet : MatBottomSheet) { }

  ngOnInit(): void {
  }

  getRegisterBottomSheet() {
    this.matBottomSheet.open(RegisterComponent);
  }

  getLoginBottomSheet() {
    this.matBottomSheet.open(LoginComponent);
  }

}
