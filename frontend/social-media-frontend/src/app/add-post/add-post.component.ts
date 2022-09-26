import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostPayload } from '../payload/post-payload';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: '',
      timestamp: ''
    }
  }

  ngOnInit() {}

  addPost() {
    if(this.addPostForm != null && this.postPayload != null) {
      this.postPayload.content = this.addPostForm.get('body')!.value;
      this.postPayload.title = this.addPostForm.get('title')!.value;


      this.postService.addPost(this.postPayload).subscribe(data => {
        this.router.navigateByUrl('/postfeed');
        console.log("post success");
      }, error => {
        console.log('Failure Response');
      })
    }
  }
}
