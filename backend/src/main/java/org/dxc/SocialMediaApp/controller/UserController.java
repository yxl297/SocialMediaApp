package org.dxc.SocialMediaApp.controller;

import java.util.ArrayList;
import java.util.List;

import org.dxc.SocialMediaApp.entity.Role;
import org.dxc.SocialMediaApp.entity.User;
import org.dxc.SocialMediaApp.payload.LoginRequestDto;
import org.dxc.SocialMediaApp.payload.UserDto;
import org.dxc.SocialMediaApp.repository.RoleRepository;
import org.dxc.SocialMediaApp.service.AuthenticationResponse;
import org.dxc.SocialMediaApp.service.UserService;
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
@RequestMapping("/api/v1/users")

@Slf4j
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@PostMapping("/register")
	public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto) {
		log.info("saveNewUser() in UserController");
		List<Role> tempRole = new ArrayList<>();
		tempRole.add(roleRepository.findByName("USER"));
		userDto.setRoles(tempRole);
		
		return new ResponseEntity<UserDto> (userService.registerUser(userDto),HttpStatus.CREATED);
	}
	
	// change to view own profile later after setting up login session
	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable(name="id")long id){
		log.info("getUserById() in UserController");
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	// @PreAuthorize("hasRole('ADMIN')")
//	@GetMapping("admin/all")
//	public ResponseEntity<List<UserDto>> getAllUsers() {
//		log.info("getAllUsers() in UserController");
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
	
	@GetMapping("admin/all")
	public List<User> getAllUsers() {
		return userService.findAll();
	}
	
	@PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequestDto loginRequestDto) {
		
        return userService.login(loginRequestDto);
    }
	
	@DeleteMapping("admin/delete/{id}")
	public ResponseEntity<Void> deleteUserById(@PathVariable(name="id") Long id) {
		userService.deleteUserById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	// update email
	@PutMapping("admin/update/{id}")
	public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable(name = "id") Long id) {
		
		return ResponseEntity.ok(userService.updateUser(userDto, id));
		
	}
	
	
	
	
	
	

}
