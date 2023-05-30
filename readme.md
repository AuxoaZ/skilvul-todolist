<!-- @format -->

# **ToDoList RESTful API - Skilvul TPA 005**

By: Alvian Nugroho

link : https://skilvul-todolist-production.up.railway.app/

---

## Documentation

### 1. **Create User**

- Endpoint: `/users/register`
- Method: `POST`
- Auth: -
- Body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  Example:

  ```json
  {
    "email": "vian@gmail.com",
    "password": "vian123"
  }
  ```

- Response:

  - Success: `201 CREATED`

    Example:

    ```json
    {
      "message": "akun berhasil dibuat, silakan login"
    }
    ```

  - Error: `400 BAD REQUEST` || `409 CONFLICT` || `500 INTERNAL SERVER ERROR`

    Example:

    If there is an input is empty:

    ```json
    {
      "message": "Semua kolom harus diinput!"
    }
    ```

    If email has already registered:

    ```json
    {
      "message": "Email sudah terdaftar, coba email lain!"
    }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

### 2. **Login User**

- Endpoint: `/users/login`
- Method: `POST`
- Auth: -
- Body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  Example:

  ```json
  {
    "email": "vian@gmail.com",
    "password": "vian123"
  }
  ```

- Response:

  - Success: `200 OK`

        Example:

        ```json

    {

        "email": "vian@gmail.com",
        "password": "$2a$10$CwmSjwbYxy7P2ouHwHESqOSsD/Pi5ziNYtYS8hCpwTKgeT.GcPdrW",
        "tasks": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3MTdhOWE4MTQ4NWM4NDdlNWVjYjM2IiwiZW1haWwiOiJ2aWFuQGdtYWlsLmNvbSIsImlhdCI6MTY4NTM3MTA5OCwiZXhwIjoxNjg1Mzc4Mjk4fQ.J8PV78keJxSg8UG6a2py8pq0DXG9mNt_6BFaCgsRSa0",
        "id": "64717a9a81485c847e5ecb36"

    }

    ```

    ```

  - Error: `400 BAD REQUEST` || `500 INTERNAL SERVER ERROR`

    Example:

    If there is an input is empty:

    ```json
    {
      "message": "semua kolom harus diinput!"
    }
    ```

    If email or password is invalid:

    ```json
    {
      "message": "email atau password salah!"
    }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

### 2. **Delete User**

- Endpoint: `/users/:user_id`
- Method: `DELETE`
- Auth: `YES`
- Token : `x-access-token`
- Body: -

  Example:

  ```json
  {
    "email": "vian@gmail.com",
    "password": "vian123"
  }
  ```

- Response:

  - Success: `204 NO CONTENT`

            Example:

        ```json

        {
        "message": "berhasil hapus data",

    }

        ```

        ```

  - Error: `400 BAD REQUEST` || `403 FOEBIDDEN` || `401 UNAUTHORIZED` || `404 NOT FOUND` || `500 INTERNAL SERVER ERROR`

    Example:

    If there is an input is empty:

    ```json
    {
      "message": "semua kolom harus diinput!"
    }
    ```

    If email or password is invalid:

    ```json
    {
      "message": "email atau password salah!"
    }
    ```

    if not logged in:

    ```json
    { "message": "login dahulu!" }
    ```

    if the token is invalid:

    ```json
    { "message": "invalid token!" }
    ```

    if data not exist:

    ```json
    { "message": "data tidak ditemukan" }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

### 3. **Update User**

- Endpoint: `/users/:user_id`
- Method: `PUT`
- Auth: `YES`
- Token : `x-access-token`
- Body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  Example:

  ```json
  {
    "email": "vian@gmail.com",
    "password": "vian123"
  }
  ```

- Response:

  - Success: `200 OK`

            Example:

            ```json

        {
        "message": "berhasil update data",
        "result": {
          "email": "vian@gmail.com",
          "password": "$2a$10$zmDW/OQvhxH2wVEjDdeSjO7iyNSQH/URGVKLIL5y808kq5LUXOXl6",
          "tasks": [],
          "id": "647587c4f3faeb45adfd8d5d"

    }
    }

        ```

        ```

  - Error: `400 BAD REQUEST` || `403 FOEBIDDEN` || `401 UNAUTHORIZED` || `500 INTERNAL SERVER ERROR`

    Example:

    If there is an input is empty:

    ```json
    {
      "message": "semua kolom harus diinput!"
    }
    ```

    If email or password is invalid:

    ```json
    {
      "message": "email atau password salah!"
    }
    ```

    if not logged in:

    ```json
    { "message": "login dahulu!" }
    ```

    if the token is invalid:

    ```json
    { "message": "invalid token!" }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

---

### 4. **Get All Tasks By User**

- Endpoint: `/tasks/user/:user_id`
- Method: `GET`
- Auth: YES
- Token : x-access-token
- Body: -

- Response:

  - Success: `200 OK`

        Example:

        ```json

    {
    "message": "data berhasil ditampilkan",
    "result": {
    "email": "vian@gmail.com",
    "password": "$2a$10$jzlJz/n5JTpRu8NopZy2Nee/lbGymOCc2Q5ah.dkbltc1kzmwGN.q",
    "tasks": [
    {
    "_id": "647591421536cd5c373339ca",
    "task_name": "baca manga",
    "description": "ashaushduhd",
    "status": "completed",
    "deadline": "2023-02-02T00:00:00.000Z",
    "__v": 0
    },
    {
    "_id": "647591a043271132aad45d26",
    "task_name": "baca buku",
    "description": "ashaushduhd",
    "status": "completed",
    "deadline": "2023-02-02T00:00:00.000Z",
    "__v": 0
    }
    ],
    "id": "64758f3e5da197f3cacd0cb4"
    }
    }

    ```

    ```

  - Error: `403 FORBIDDEN` || `401 UNAUTHORIZED` || `500 INTERNAL SERVER ERROR`

    Example:

    if not logged in:

    ```json
    { "message": "login dahulu!" }
    ```

    if the token is invalid:

    ```json
    { "message": "invalid token!" }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

### 5. **Add Task**

- Endpoint: `/taks/user/user_id`
- Method: `POST`
- Auth: YES
- Token: `x-access-token`
- Body:

  ```json
  {
    "taks_name": "string",
    "description": "string",
    "status": "string",
    "deadline": "date"
  }
  ```

- Response:

  - Success: `201 CREATED`

        Example:

        ```json
        {

    "message": "berhasil menambah data",
    "result": {
    "email": "vian@gmail.com",
    "password": "$2a$10$jzlJz/n5JTpRu8NopZy2Nee/lbGymOCc2Q5ah.dkbltc1kzmwGN.q",
    "tasks": [
    "647591421536cd5c373339ca",
    "647591a043271132aad45d26"
    ],
    "id": "64758f3e5da197f3cacd0cb4"
    }
    }

    ```

    ```

  - Error: `403 FORBIDDEN` || `401 UNAUTHORIZED` || `500 INTERNAL SERVER ERROR`

    Example:

    if not logged in:

    ```json
    { "message": "login dahulu!" }
    ```

    if the token is invalid:

    ```json
    { "message": "invalid token!" }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

### 6. **Delete All Task**

- Endpoint: `tasks/user/user_id`
- Method: `DELETE`
- Auth: `YES`
- Token: `x-access-token`
- Body: -

- Response:

  - Success: `204 NO CONTENT`

    Example:

    ```json
    {
      "message": "berhasil hapus semua data!"
    }
    ```

  - Error: `403 FORBIDDEN` || `401 UNAUTHORIZED` || `500 INTERNAL SERVER ERROR`

    Example:

    if not logged in:

    ```json
    { "message": "login dahulu!" }
    ```

    if the token is invalid:

    ```json
    { "message": "invalid token!" }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

### 7. **Detail Task**

- Endpoint: `/tasks/:task_id`
- Method: `GET`
- Auth: YES
- Token: `x-access-token`
- Body: -

- Response:

  - Success: `200 OK`

        Example:

        ```json

    {
    "message": "data berhasil ditampilkan",
    "result": {
    "task_name": "baca manga",
    "description": "ashaushduhd",
    "status": "completed",
    "deadline": "2023-02-02T00:00:00.000Z",
    "id": "647591421536cd5c373339ca"
    }
    }

    ```

    ```

- Error: `403 FORBIDDEN` || `401 UNAUTHORIZED` || `500 INTERNAL SERVER ERROR`

  Example:

  if not logged in:

  ```json
  { "message": "login dahulu!" }
  ```

  if the token is invalid:

  ```json
  { "message": "invalid token!" }
  ```

  If the server get an error:

  ```json
  {
    "message": "Terjadi kesalahan server!",
    "error": <error message>,
  }
  ```

  ```

  ```

### 8. **Update Task**

- Endpoint: `/tasks/:task_id`
- Method: `PUT`
- Auth: YES
- Token: `x-access-token`
- Body:

  ```json
  {
    "taks_name": "string",
    "description": "string",
    "status": "string",
    "deadline": "date"
  }
  ```

- Response:

  - Success: `200 OK`

        Example:

        ```json
        {

    "message": "data berhasil diubah",
    "result": {
    "email": "vian@gmail.com",
    "password": "$2a$10$jzlJz/n5JTpRu8NopZy2Nee/lbGymOCc2Q5ah.dkbltc1kzmwGN.q",
    "tasks": [
    "647591421536cd5c373339ca",
    "647591a043271132aad45d26"
    ],
    "id": "64758f3e5da197f3cacd0cb4"
    }
    }

    ```

    ```

  - Error: `403 FORBIDDEN` || `401 UNAUTHORIZED` || `500 INTERNAL SERVER ERROR`

    Example:

    if not logged in:

    ```json
    { "message": "login dahulu!" }
    ```

    if the token is invalid:

    ```json
    { "message": "invalid token!" }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```

### 9. **Delete Spesific Todo**

- Endpoint: `/tasks/:id`
- Method: `DELETE`
- Auth: `YES`
- Token: `x-access-token`
- Body: -

- Response:

  - Success: `204 NO CONTENT`

    Example:

    ```json
    {
      "message": "berhasil hapus data!"
    }
    ```

  - Error: `404 NOT FOUND` || `500 INTERNAL SERVER ERROR`

    Example:

    If todo not found:

    ```json
    {
      "message": "Data tidak ditemukan!"
    }
    ```

    If the server get an error:

    ```json
    {
      "message": "Terjadi kesalahan server!",
      "error": <error message>,
    }
    ```
