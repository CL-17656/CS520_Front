# API Documentation

---

## Table of Contents

- [Authentication](#authentication)
  - [Register User](#register-user)
  - [Login User](#login-user)
- [Statistics](#statistics)
  - [Fetch Test Scores](#fetch-test-scores)
  - [Fetch Grade Distribution](#fetch-grade-distribution)

---

## Authentication

### Register User

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user (student or instructor) in the system.

#### Request Headers

- `Content-Type`: `application/json`

#### Request Body

```json
{
  "accountType": "Student" or "Instructor",
  "email": "user@example.com",
  "password": "your_password"
}
```

#### Response

- **Status Code**: `201 Created`
- **Body**:

```json
{
  "message": "User registered successfully."
}
```

#### Error Responses

- **Status Code**: `400 Bad Request`

  - **Reason**: Invalid input data (e.g., missing fields, invalid email format).
  - **Body**:

    ```json
    {
      "error": "Invalid input data."
    }
    ```

- **Status Code**: `409 Conflict`

  - **Reason**: Email already registered.
  - **Body**:

    ```json
    {
      "error": "Email already in use."
    }
    ```

---

### Login User

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.

#### Request Headers

- `Content-Type`: `application/json`

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

#### Response

- **Status Code**: `200 OK`
- **Body**:

```json
{
  "token": "jwt_token_string",
  "accountType": "Student" or "Instructor",
  "userId": "unique_user_id"
}
```

#### Error Responses

- **Status Code**: `401 Unauthorized`

  - **Reason**: Invalid email or password.
  - **Body**:

    ```json
    {
      "error": "Invalid credentials."
    }
    ```

- **Status Code**: `400 Bad Request`

  - **Reason**: Missing email or password.
  - **Body**:

    ```json
    {
      "error": "Email and password are required."
    }
    ```

---

## Statistics

### Fetch Test Scores

- **Endpoint**: `/api/statistics/scores`
- **Method**: `GET`
- **Description**: Retrieves test scores over time for a specific course.

#### Request Headers

- `Authorization`: `Bearer <jwt_token>`

#### Query Parameters

- `courseId` (required): The ID of the course.

#### Example Request

```
GET /api/statistics/scores?courseId=COURSE123
```

#### Response

- **Status Code**: `200 OK`
- **Body**:

```json
[
  {
    "date": "2024-08-01",
    "score": 95
  },
  {
    "date": "2024-09-07",
    "score": 88
  },
  {
    "date": "2024-09-15",
    "score": 76
  },
  {
    "date": "2024-09-19",
    "score": 84
  }
]
```

#### Error Responses

- **Status Code**: `401 Unauthorized`

  - **Reason**: Missing or invalid JWT token.
  - **Body**:

    ```json
    {
      "error": "Unauthorized access."
    }
    ```

- **Status Code**: `400 Bad Request`

  - **Reason**: Missing `courseId` parameter.
  - **Body**:

    ```json
    {
      "error": "Course ID is required."
    }
    ```

- **Status Code**: `404 Not Found`

  - **Reason**: Course not found.
  - **Body**:

    ```json
    {
      "error": "Course not found."
    }
    ```

---

### Fetch Grade Distribution

- **Endpoint**: `/api/statistics/grades`
- **Method**: `GET`
- **Description**: Retrieves the grade distribution for a specific quiz.

#### Request Headers

- `Authorization`: `Bearer <jwt_token>`

#### Query Parameters

- `quizId` (required): The ID of the quiz.

#### Example Request

```
GET /api/statistics/grades?quizId=QUIZ456
```

#### Response

- **Status Code**: `200 OK`
- **Body**:

```json
[
  {
    "grade": "A",
    "count": 10
  },
  {
    "grade": "B",
    "count": 8
  },
  {
    "grade": "C",
    "count": 5
  },
  {
    "grade": "D",
    "count": 2
  },
  {
    "grade": "F",
    "count": 1
  }
]
```

#### Error Responses

- **Status Code**: `401 Unauthorized`

  - **Reason**: Missing or invalid JWT token.
  - **Body**:

    ```json
    {
      "error": "Unauthorized access."
    }
    ```

- **Status Code**: `400 Bad Request`

  - **Reason**: Missing `quizId` parameter.
  - **Body**:

    ```json
    {
      "error": "Quiz ID is required."
    }
    ```

- **Status Code**: `404 Not Found`

  - **Reason**: Quiz not found.
  - **Body**:

    ```json
    {
      "error": "Quiz not found."
    }
    ```

---

## Notes

- All endpoints that require authentication expect a valid JWT token in the `Authorization` header.
- Dates are in `YYYY-MM-DD` format.
- Ensure that the frontend includes proper error handling for the various status codes.
- All times are in UTC unless specified otherwise.

---

Feel free to add more endpoints to this document as you develop additional features. Remember to keep the documentation up-to-date to facilitate collaboration and maintenance.

Let me know if you need any further assistance!
