import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPayload } from '../add-post/post-payload';
import { PostService } from '../post.service';


@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})


export class PostfeedComponent implements OnInit {

  posts : Observable<PostPayload[]>;

  constructor(private postService : PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllPosts();
  }

}
