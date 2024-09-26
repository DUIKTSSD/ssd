# Auth Controller

The `AuthController` is responsible for handling user authentication, registration, and user management (admin-specific operations). The controller uses JWT tokens for authentication and enforces email validation for registrations.

## Endpoints

### 1. User Login
- **Method**: `POST` `/api/auth/login`
- **Description**: Authenticates a user using their username and password. Returns a JWT token if authentication is successful.
- **Request Body**:
  - `AuthRequest`: Contains the username and password.
  
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```
- **Response**: 
  - **200 OK**: If login is successful, returns the JWT token.
  - **401 UNAUTHORIZED**: If the username or password is incorrect.

---

### 2. User Registration
- **Method**: `POST` `/api/auth/register`
- **Description**: Registers a new user with a valid `@stud.duikt.edu.ua` email address.
- **Request Body**:
  - `UserRegistrationRequest`: Contains the username, password, and email.
  
  ```json
  {
    "username": "user123",
    "password": "password123",
    "email": "user123@stud.duikt.edu.ua"
  }
  ```
- **Response**: 
  - **200 OK**: If registration is successful.
  - **400 BAD REQUEST**: If the email is invalid or another issue arises during registration.
  
- **Email Validation**: The email must match the regex `^[A-Za-z0-9._%+-]+@stud\\.duikt\\.edu\\.ua$`.

---

### 3. Admin Registration
- **Method**: `POST` `/api/auth/admin/reg`
- **Description**: Registers a new admin user. **(You already must be an admin for registration a new admin)**
- **Request Body**:
  - `UserRegistrationRequest`: Contains the admin's username, password, and email.
  
  ```json
  {
    "username": "admin123",
    "password": "adminpass123",
    "email": "admin@domain.com"
  }
  ```
- **Response**: 
  - **200 OK**: If admin registration is successful.

---

### 4. Admin Deletion
- **Method**: `DELETE` `/api/auth/admin/del/{username}`
- **Description**: Deletes an admin by their username.
- **Path Variable**: 
  - `username`: The admin's username to be deleted.
  
- **Response**:
  - **200 OK**: If the admin is successfully deleted.
  - **400 BAD REQUEST**: If there’s an error during the deletion process.

---

### 5. Get User Info
- **Method**: `GET` `/api/auth/UserInfo`
- **Description**: Returns the username of the currently authenticated user.
- **Response**: 
  - The username of the user from the `SecurityContextHolder`.

---

## Email Validation

- The registration process only accepts emails that match the domain `@stud.duikt.edu.ua`.
- The pattern used for validation: `^[A-Za-z0-9._%+-]+@stud\\.duikt\\.edu\\.ua$`.

## Security

- **JWT Token Authentication**: The login method returns a JWT token for authenticated users, which can be used to authenticate further requests.
- **Spring Security**: The `SecurityContextHolder` is used to get the details of the currently authenticated user.

---

### Example Login Flow:
1. **Login Request**: User sends a POST request to `/api/auth/login` with their username and password.
2. **Successful Response**: If credentials are correct, a JWT token is returned.
3. **Token Usage**: The JWT token is used in the `Authorization` header for future requests to secure endpoints.

# Projects Controller

The `ProjectsController` is a REST controller responsible for managing projects in the system. It provides endpoints to create, delete, join, filter, and close projects.

## Endpoints

### 1. Create a Project
- **Method**: `POST` `/api/projects/add`
- **Description**: Creates a new project. The project leader is automatically set to the currently authenticated user.
- **Request Body**:
  ```json
  {
    "title": "title2",
    "mainText": "main2",
    "technologyStack": "java2",
    "wishes": "human2"
  }
  ```
- **Response**: The created `Project` object.

---

### 2. Delete a Project
- **Method**: `DELETE` `/api/projects/del/{id}`
- **Description**: Deletes a project if the current user is the leader of the project.
- **Path Variable**: 
  - `id`: The project ID.
- **Response**: 
  - **200 OK**: If the project is successfully deleted.
  - **403 UNAUTHORIZED**: If the current user is not the project leader.
  - **304 NOT MODIFIED**: If the project could not be deleted.

---

### 3. Join a Project
- **Method**: `POST` `/api/projects/join/{id}`
- **Description**: Allows the currently authenticated user to join the project team if they are not already part of it.
- **Path Variable**: 
  - `id`: The project ID.
- **Response**: 
  - **200 OK**: If the user successfully joins the project.
  - **400 BAD REQUEST**: If the user is already part of the project.
  - **404 NOT FOUND**: If the project is not found.

---

### 4. Get All Projects
- **Method**: `GET` `/api/projects`
- **Description**: Fetches a list of all available projects.
- **Response**: 
  - **200 OK**: A list of `Project` objects.

---

### 5. Get Project by ID
- **Method**: `GET` `/api/projects/{id}`
- **Description**: Fetches details of a specific project by its ID.
- **Path Variable**: 
  - `id`: The project ID.
- **Response**: 
  - **200 OK**: The `Project` object.

---

### 6. Filter Projects
- **Method**: `GET` `/api/projects/filter`
- **Description**: Filters projects based on optional query parameters.
- **Query Parameters**:
  - `title` (optional): Filters by part of the title (partial match).
  - `leaderUsername` (optional): Filters by the project leader’s username (partial match).
  - `technologyStack` (optional): Filters by part of the technology stack (partial match).
  - `mainText` (optional): Filters by part of the main text (partial match).
  - `status` (optional): Filters by project status (`true` for open, `false` for closed).
- **Response**: 
  - **200 OK**: A list of filtered `Project` objects.

---

### 7. Close a Project
- **Method**: `POST` `/api/projects/close/{id}`
- **Description**: Closes a project if the current user is the leader.
- **Path Variable**: 
  - `id`: The project ID.
- **Response**: 
  - **200 OK**: If the project was successfully closed.
  - **403 UNAUTHORIZED**: If the user is not the leader of the project.

---

## Security

- Endpoints are secured using **Spring Security**.
- The currently authenticated user is retrieved from the `SecurityContextHolder`.
- Only the project leader has the permissions to delete or close projects.

## Services Used

- **ProjectService**: Handles core operations like creating, reading, updating, and deleting projects, as well as closing projects.
- **UserService**: Manages user-related operations, such as retrieving the current user by username.
- **ProjectFilterService**: Provides functionality to filter projects based on various criteria, supporting partial matches for strings.

