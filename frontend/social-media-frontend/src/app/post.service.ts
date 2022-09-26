import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPayload } from './payload/post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = "http://localhost:8080/api/posts/";

  constructor(private httpClient: HttpClient) {
  }

  addPost(postPayload: PostPayload){
    return this.httpClient.post(this.url + 'new', postPayload);
  }

  getAllPosts(): Observable<PostPayload[]>{
    return this.httpClient.get<PostPayload[]>(this.url + 'all');
  }

  getPost(permaLink: Number):Observable<PostPayload>{
    return this.httpClient.get<PostPayload>(this.url + permaLink);
  }

  updatePost(post : PostPayload) {
    return this.httpClient.put<PostPayload>(this.url + "admin/update/" + post.id, post);
  }

  deletePost(id : any) {
    return this.httpClient.delete(this.url + "admin/delete/" + id);
  }
}
