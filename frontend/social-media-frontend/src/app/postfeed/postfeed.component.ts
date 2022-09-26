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
  postList : PostPayload[];
  slicedPostList : PostPayload[];
  currentPage : PostPayload[];
  pageNumber : number;
  pageEvent : PageEvent;
  totalNumberOfPosts : number;

  constructor(private postService : PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(data => {
      this.postList = data;
      console.log(this.postList);
    })
    this.slicedPostList = this.postList.slice(0,10);

  }

  onPageChange(pageEvent : any) {
    this.pageNumber = pageEvent.pageIndex;
    let addTotalPosts = this.pageNumber * 10;
    this.slicedPostList = this.postList.slice(addTotalPosts, 10 + addTotalPosts);
  }
}
