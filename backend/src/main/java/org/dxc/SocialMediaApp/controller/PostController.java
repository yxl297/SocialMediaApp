package org.dxc.SocialMediaApp.controller;

import java.util.List;

import org.dxc.SocialMediaApp.payload.PostDto;
import org.dxc.SocialMediaApp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
// http://localhost:8080/api/v1/users/posts
@RequestMapping("api/v1/posts")
@Slf4j
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@PostMapping("/new")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto) {
		log.info("createPost() in PostController");
		return new ResponseEntity<PostDto> (postService.createPost(postDto),HttpStatus.CREATED);
	}
	
	// change to view own profile later after setting up login session
	@GetMapping("/{id}")
	public ResponseEntity<PostDto> getPostById(@PathVariable(name="id")long id){
		log.info("getUserById() in UserController");
		return ResponseEntity.ok(postService.getPostById(id));
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<PostDto>> getAllPosts() {
		log.info("getAllUsers() in UserController");
        return ResponseEntity.ok(postService.getAllPosts());
    }
}
