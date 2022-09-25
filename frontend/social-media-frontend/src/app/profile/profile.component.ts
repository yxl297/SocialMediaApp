import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // onContinueClick(nameInput:HTMLInputElement,descriptionInput:HTMLTextAreaElement){

  //   let name=nameInput.value;
  //   let description=descriptionInput.value
  //   this.firestore.create(
  //     {
  //       path:["Users",this.auth.getAuth().currentUser!.uid],
  //       data:{
  //         publicName:name,
  //         description:description
  //       },
  //       onComplete:(docId)=>{
  //         alert("profile Created");
  //         nameInput.value=name;
  //         descriptionInput.value=description
  //       },
  //       onFail:(err)=>{

  //       }
  //     }
  //   )

  // }

}
