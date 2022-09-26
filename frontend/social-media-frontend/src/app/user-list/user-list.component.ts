import { Component, OnInit } from '@angular/core';
import { User } from '../payload/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList : User[];

  constructor(private userService : UserService) {
   }

  ngOnInit(): void {
    this.userService.findAll().subscribe((data) => {
      this.userList = data;
      console.log(this.userList);
    })
  }

  updateOnClick(user : any) {
    this.userService.update(user).subscribe(result => console.log(result));

  }

  deleteOnClick(id : any) {
    this.userService.delete(id).subscribe(result => console.log(result));
    location.reload();
  }


}
