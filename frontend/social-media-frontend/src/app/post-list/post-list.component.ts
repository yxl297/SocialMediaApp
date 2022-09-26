import { Component, OnInit } from '@angular/core';
import { PostPayload } from '../payload/post-payload';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList : PostPayload[];

  constructor(private postService : PostService) {
   }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.postList = data;
      console.log(this.postList);
    })
  }

  updateOnClick(post : any) {
    this.postService.updatePost(post).subscribe(result => console.log(result));

  }

  deleteOnClick(id : any) {
    this.postService.deletePost(id).subscribe(result => console.log(result));
    location.reload();
  }

}
