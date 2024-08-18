<p align="center">
  <a href="https://jcorp-web.pages.dev/" target="_blank" rel="noopener noreferrer"><img src="https://jcorp-web.pages.dev/favicon.ico" width="80" alt="TFD Logo" /></a>
</p>
<p align="center">A <a href="https://nodejs.com/" target="_blank" rel="noopener noreferrer">node.js</a> boilerplate by <a href="https://jcorp-web.pages.dev/" target="_blank" rel="noopener noreferrer">Samrong-MEAS</a> AKA J'Corp </p>
<p align="center">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" width="75">
<img src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white" width="80">
<img src="https://img.shields.io/badge/MongoDB-%2347A248.svg?logo=mongodb&logoColor=white" width="80">
<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" width="70">
<a href="https://www.gnu.org/licenses/gpl-3.0" target="_blank"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Package License" /></a>
<img alt="YouTube Channel Subscribers" src="https://img.shields.io/youtube/channel/subscribers/UCo1-oGQUyZRDTabcX1kiWiw?style=social">
<br/>
<img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_560/https://adscom.biz/wp-content/uploads/2017/02/ABA-logo-no-padding.png" width="80" alt="ABA" />
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" width="55" alt="TFD Logo" />
</p>

## Node JS RESTFul API Boilerplate

## Features

This is a NestJS boilerplate code with preconfigured libraries and packages with the following features:

- One-click setup with [Docker](https://www.docker.com/)
- [None-SQL] project build with [MONGODB](https://mongodb.org) by default.
- Data-generating with [fake.js](https://fakerjs.dev/)
- User roles and Permissions sample validation
- Authentication with [JWT](https://jwt.io/)
- Google SSO authentication [Google-Auth2.0](https://developers.google.com/identity/protocols/oauth2) (next-version maybe)
- Requests Logger to webhook to [Discord](https://discordapp.com)
- Streaming logger file
- Local-Admin Gerneration

## Setup Guide

### Without Docker
- Create .env file with command `cp .env.example .env` and replace with your own env variable
- `npm install` or `yarn install`
- `npm run dev` or `yarn dev` (Your API will be exposed through port 5000)

#### Generate Local-Admin
```bash
npm run gen-admin
```

### #Profile And Authentication

### 1. User Registration

- **Endpoint**: `/api/user/auth/resgister`
- **Method**: `POST`
- **Request Body**:
  - `fullname` (required): insensitive and spacing allowed
  - `username` (required): case-sensitive and special charactor are not allow!
  - `email` (required): unique email only.
  - `tel` (required): 9-10 digits only.
  - `roles` (required): must be array.
  - `password` (required): min 6 length and max 100 length.
  - `confirmedPassword` every character need to match to `password`
- **Example Request Body**:
  ```json
  {
    "fullname": "Samrong Meas",
    "username": "samrongmeas",
    "email": "meassamrong99@gmail.com",
    "tel": "0123456789",
    "roles": ["admin", "user"],
    "password": "password123",
    "confirmedPassword": "password123"
  }
  ```

### 2. User Login

- **Endpoint**: `/api/user/auth/login`
- **Method**: `POST`
- **Request Body**:
  - `username` or `email` (required): one of them is required!
  - `password` (required): min 6 length and max 100 length.
- **Example Request Body**:
  - login using email address
    ```json
    {
      "email": "meassamrong99@gmail.com",
      "password": "password123"
    }
    ```
  - login using username
    ```json
    {
      "username": "samrongmeas",
      "password": "password123"
    }
    ```

### 3. Update Profile

- **Endpoint**: `/api/user/auth/self_update`
- **Method**: `PATCH`
- **Headers Authorization**
  - `Bearer token` (JWT token)
- **Request Body**:
  - `fullname` (optional): insensitive and spacing allowed
  - `username` (optional): case-sensitive and special charactor are not allow!
  - `email` (optional): unique email only.
  - `tel` (optional): 9-10 digits only.
  - `roles` (optional): must be array.
  - `password` (optional): your new password min 6 length and max 100 length.
  - `confirmedPassword` confirm your new password every character need to match to `password`
- **Example Request Body**:
  ```json
  {
    "fullname": "Samrong Meas new",
    "username": "samrongmeasNew",
    "email": "meassamrong99new@gmail.com",
    "tel": "0987654321",
    "roles": ["admin", "moderator"],
    "password": "123456",
    "confirmedPassword": "123456"
  }
  ```

### 3. Delete Profile

- **Endpoint**: `/api/user/auth/self_remove`
- **Method**: `DELETE`
- **Headers Authorization**
  - `Bearer token` (JWT token)
- **Request Body**:
  - `password` (required): profile password
- **Example Request Body**:
  ```json
  {
    "password": "123456"
  }
  ```

### 4. Get Profile

- **Endpoint**: `/api/user/myprofile`
- **Method**: `GET`
- **Headers Authorization**
  - `Bearer token` (JWT token)
- **Example Request**:
  - `http://localhost:5000/api/user/myprofile`

### #Administration Route

### 1. Get All Users Profile

- **Endpoint**: `/api/user/profile/all`
- **Method**: `GET`
- **Headers Authorization**
  - `Bearer token` (JWT token)
- Permission Required:
  - `['admin', 'moderator']`

### 2. Get Specified Profile

- **Endpoint**: `/api/user/profile/id`
- **Method**: `GET`
- **Headers Authorization**
  - `Bearer token` (JWT token)
- **Query Parameters**
  - `id` (requierd) user profile id
- **Permission Required**:
  - `['admin', 'moderator']`
- **Example Request**:
  - `http://localhost:5000/api/user/profile/id?id=66bc7xxxxxx0ef301e075xxx`

### 3. Delete User Profile

- **Endpoint**: `/api/user/auth/remove/user`
- **Method**: `DELETE`
- **Headers Authorization**
  - `Bearer token` (JWT token)
- **Query Parameters**
  - `id` (requierd) user profile id
- **Permission Required**:
  - `['admin', 'moderator']`
- **Example Request**:
  - `http://localhost:5000/api/user/auth/remove/user?id=66bc7xxxxxx0ef301e075xxx`

### 4. Update User Profile

- **Endpoint**: `/api/user/auth/update/users`
- **Method**: `PATCH`
- **Headers Authorization**
  - `Bearer token` (JWT token)
- **Query Parameters**
  - `id` (requierd) user profile id
- **Permission Required**:
  - `['admin', 'moderator']`
- **Request Body**:

  - `fullname` (optional): insensitive and spacing allowed
  - `username` (optional): case-sensitive and special charactor are not allow!
  - `email` (optional): unique email only.
  - `tel` (optional): 9-10 digits only.
  - `roles` (optional): must be array.
  - `password` (optional): user new password min 6 length and max 100 length.
  - `confirmedPassword` confirm new user password every character need to match to `password`

- **Example Request Body**:
  ```json
  {
    "fullname": "Samrong Meas new",
    "username": "samrongmeasNew",
    "email": "meassamrong99new@gmail.com",
    "tel": "0987654321",
    "roles": ["admin", "moderator"],
    "password": "123456",
    "confirmedPassword": "123456"
  }
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
