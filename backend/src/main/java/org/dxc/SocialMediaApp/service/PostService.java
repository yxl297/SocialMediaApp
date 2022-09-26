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
	
	public void deletePostById(Long id) {
		Post post = postRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("DELETE", "id", id));
		postRepository.delete(post);
	}

	public PostDto updatePost(PostDto postDto, Long id) {
		Post post = postRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("PUT", "id", id));
		
		if(postDto.getId() != null) { post.setId(postDto.getId()); }
		if(postDto.getTitle() != null) { post.setTitle(postDto.getTitle()); }
		if(postDto.getContent() != null) { post.setContent(postDto.getContent()); }
		if(postDto.getUsername() != null) { post.setUsername(postDto.getUsername()); }
		if(postDto.getTimeStamp()!= null) { post.setTimeStamp(postDto.getTimeStamp()); }
		
		Post updatedPost = postRepository.save(post);
		
		PostDto updatedPostDto = mapToPostDto(updatedPost);
		
		return updatedPostDto;
		
	}
	
}
