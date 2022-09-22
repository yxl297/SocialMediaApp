package org.dxc.SocialMediaApp.payload;

import java.util.Collection;

import org.dxc.SocialMediaApp.entity.Post;
import org.dxc.SocialMediaApp.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	
	private Long uid;
	private String email;
	private String password;
	private String username;
	private Collection<Role> roles;
	private Collection<Post> posts;
}
