package org.dxc.SocialMediaApp.entity;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long uid;
	@Column(unique=true)
	@NotBlank
	private String email;
	@NotBlank
	private String password;
	@Column(unique=true)
	@NotBlank
	private String username;
	@ManyToMany(fetch = FetchType.EAGER)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinTable(name = "user_roles",
			joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "uid"),
			inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Collection<Role> roles;
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="uid")
	private Collection<Post> posts;
	
	
	public User(String email,
				String password,
				String username) {
		super();
		this.email = email;
		this.password = password;
		this.username = username;
	}
	
	
	
}
