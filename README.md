
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

### 2. User Login

- **Endpoint**: `/api/user/auth/login`
- **Method**: `POST`
- **Request Body**:
  - `username` or `email` (required): one of them is required!
  - `password` (required): min 6 length and max 100 length.
- **Example Request Body**:
  ```json
  {
    "email": "meassamrong99@gmail.com",
    "password": "password123",
  }
  
  ----------------OR----------------
  
  {
    "username": "samrongmeas",
    "password": "password123",
  }


### 3. Update Profile

- **Endpoint**: `/api/user/auth/self_update`
- **Method**: `PATCH`
  - **Authorization**
  - Auth Type : `Bearer token` (JWT token)
  - **Request Body**:
  - `fullname` (optional): insensitive and spacing allowed
  - `username` (optional): case-sensitive and special charactor are not allow!
  - `email` (optional): unique email only.
  - `tel` (optional): 9-10 digits only.
  - `roles` (optional): must be array.
  - `password` (optional): min 6 length and max 100 length.
  - `confirmedPassword` every character need to match to `password`

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



### 3. Delete Profile

- **Endpoint**: `/api/user/auth/self_remove`
- **Method**: `DELETE`
  - **Authorization**
  - Auth Type : `Bearer token` (JWT token)
  - **Request Body**:
  - `password` (required): profile password

- **Example Request Body**:
  ```json
  {
    "password": "123456",
  }



## License
[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2024 [SAMRONG MES](https://github.com/meassamrong/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.