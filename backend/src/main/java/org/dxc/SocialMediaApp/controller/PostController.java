package org.dxc.SocialMediaApp.controller;

import org.dxc.SocialMediaApp.payload.PostDto;
import org.dxc.SocialMediaApp.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:4200", maxAge=3600)
@RestController
@RequestMapping("api/posts")
@Slf4j
public class PostController {

	@Autowired
	private PostService postService;

	@PostMapping("/new")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto) {
		log.info("createPost() in PostController");
		return new ResponseEntity<PostDto>(postService.createPost(postDto), HttpStatus.CREATED);
	}

	// change to view own profile later after setting up login session
	@GetMapping("/{id}")
	public ResponseEntity<PostDto> getPostById(@PathVariable(name = "id") long id) {
		log.info("getUserById() in UserController");
		return ResponseEntity.ok(postService.getPostById(id));
	}

	@DeleteMapping("admin/delete/{id}")
	public ResponseEntity<String> deleteUserById(@PathVariable(name="id") Long id) {
		postService.deletePostById(id);
		return new ResponseEntity<String>("Post deleted successfully", HttpStatus.OK);
	}
	
	// update email
	@PutMapping("admin/update/{id}")
	public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto, @PathVariable(name = "id") Long id) {
		
		return ResponseEntity.ok(postService.updatePost(postDto, id));
		
	}
}
