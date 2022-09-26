import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PostPayload } from '../payload/post-payload';
import { PostService } from '../post.service';


@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.css']
})


export class PostfeedComponent implements OnInit {

  posts : Observable<PostPayload[]>;
  currentPage : PostPayload[];
  pageNumber : number;
  pageEvent : PageEvent;
  totalNumberOfPosts : number;

  constructor(private postService : PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllPosts();
    this.posts.subscribe((data) => console.log(data));
  }

  // onPageChange(pageEvent) {
  //   this.pageNumber = pageEvent.pageIndex;
  //   let addTotalPosts = this.pageNumber * 10;
  //   this.posts.subscribe
  //   this.posts.subscribe((data) => {

  // }

}
