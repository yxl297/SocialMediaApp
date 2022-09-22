package org.dxc.SocialMediaApp.payload;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
	private Long postId;
	private String postContent;
	private Date postTimeStamp;
	private String username;
}
