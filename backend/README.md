**Features**

Admin
- delete posts
- view all users

user
- create account
- login
- create post
- update user details
	- change display name
	- change password

**Frontend Technologies**
- Angular 14
- Bootstrap 4

**Backend Technologies**
- Springboot 2.7.3
- MySQL
- 

**Entities**
admin
- adminId
- adminName
- adminPassword

user
- userId
- displayName
- username
- userPassword
- email

post
- postId
- postTitle
- postContent
- userId (fkey)
