package org.dxc.SocialMediaApp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.dxc.SocialMediaApp.entity.User;
import org.dxc.SocialMediaApp.exception.ResourceNotFoundException;
import org.dxc.SocialMediaApp.payload.LoginRequestDto;
import org.dxc.SocialMediaApp.payload.UserDto;
import org.dxc.SocialMediaApp.repository.UserRepository;
import org.dxc.SocialMediaApp.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	@Transactional
	public UserDto registerUser(UserDto userDto) {
		User user = mapToUserEntity(userDto);
		User newUser = userRepository.save(user);
			
		UserDto userResponse = mapToUserDto(newUser);
		
		return userResponse;
	}
	
	public User mapToUserEntity(UserDto userDto) {
		User user = new User();
		user.setUid(null);
		user.setEmail(userDto.getEmail());
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		user.setUsername(userDto.getUsername());
		user.setRoles(userDto.getRoles());
		user.setPosts(userDto.getPosts());
		
		return user;
	}
	
	public UserDto mapToUserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setUid(user.getUid());
		userDto.setEmail(user.getEmail());
		userDto.setPassword(user.getPassword());
		userDto.setUsername(user.getUsername());
		userDto.setRoles(user.getRoles());
		userDto.setPosts(user.getPosts());
		
		return userDto;
	}

	public UserDto getUserById(long id) {
		User user = userRepository.findById(id).orElseThrow(
				()->new ResourceNotFoundException("USER", "id", id));
		return mapToUserDto(user);
	}
	
	public List<UserDto> getAllUsers() {
		List<User> listOfUsers = userRepository.findAll();
		List<UserDto> userResponseList = new ArrayList<>();
		for (User user : listOfUsers) {
			UserDto tempUserDto = mapToUserDto(user);
			userResponseList.add(tempUserDto);
		}
		
		return userResponseList;
		
	}

	public AuthenticationResponse login(LoginRequestDto loginRequestDto) {
		Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequestDto.getUsername(),
				loginRequestDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authenticate);
		String authenticationToken = jwtProvider.generateToken(authenticate);

		return new AuthenticationResponse(authenticationToken, loginRequestDto.getUsername());
	}

	public Optional<org.springframework.security.core.userdetails.User> getCurrentUser() {
		org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder
				.getContext().getAuthentication().getPrincipal();
		return Optional.of(principal);
	}

	
	
}