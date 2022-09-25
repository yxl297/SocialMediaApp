package org.dxc.SocialMediaApp.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.dxc.SocialMediaApp.entity.Post;
import org.dxc.SocialMediaApp.exception.ResourceNotFoundException;
import org.dxc.SocialMediaApp.payload.PostDto;
import org.dxc.SocialMediaApp.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PostService {
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserService userService;
	
	public PostDto createPost(PostDto postDto) {
		postDto.setTimeStamp(Date.from(Instant.now()));
		
		User user = userService.getCurrentUser().orElseThrow(() -> 
				new IllegalArgumentException("No User logged in"));
		postDto.setUsername(user.getUsername());
		
		Post post = mapToPostEntity(postDto);
		Post newPost= postRepository.save(post);
		
		PostDto postResponse = mapToPostDto(newPost);
		return postResponse;
	}
	
	public Post mapToPostEntity(PostDto postDto) {
		Post post = new Post();
		post.setId(null);
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setTimeStamp(postDto.getTimeStamp());
		post.setUsername(postDto.getUsername());
		
		return post;
		
	}
	
	public PostDto mapToPostDto(Post post) {
		PostDto postDto = new PostDto();
		postDto.setId(post.getId());
		postDto.setTitle(post.getTitle());
		postDto.setContent(post.getContent());
		postDto.setTimeStamp(post.getTimeStamp());
		postDto.setUsername(post.getUsername());
		
		return postDto;
	}

	public PostDto getPostById(long id) {
		Post post = postRepository.findById(id).orElseThrow(
				()->new ResourceNotFoundException("POST", "id", id));
		return mapToPostDto(post);
	}

	public List<PostDto> getAllPosts() {
		List<Post> listOfPosts = postRepository.findAll();
		List<PostDto> postResponseList = new ArrayList<>();
		for (Post post : listOfPosts) {
			PostDto tempPostDto = mapToPostDto(post);
			postResponseList.add(tempPostDto);
		}
		
		return postResponseList;
	}

}
