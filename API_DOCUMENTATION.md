# SmartKassa API Documentation

This document serves as the complete API reference for the SmartKassa backend. It defines the contract between the frontend and backend teams, ensuring clear communication and understanding of all endpoints, request formats, response formats, and error handling.

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Common Error Responses](#common-error-responses)
- [Endpoints](#endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Ride Management Endpoints](#ride-management-endpoints)
  - [Fahrten Endpoints](#fahrten-endpoints)
  - [Account Management Endpoints](#account-management-endpoints)
  - [File Storage Endpoints](#file-storage-endpoints)

---

## Base URL

**Production:** `https://smart-kassa.vercel.app`  
**Development:** `http://localhost:3000`

Use environment variable `VITE_API_URL` on frontend to configure the base URL.

---

## Authentication

SmartKassa uses JWT (JSON Web Tokens) for authentication with two types of tokens:

### Access Token
- **Purpose:** Used for authenticating API requests
- **Lifetime:** Short-lived (typically 15 minutes)
- **Storage:** Stored in frontend (localStorage/secure storage)
- **Usage:** Sent in `Authorization` header as `Bearer <token>`

### Refresh Token
- **Purpose:** Used to obtain new access tokens
- **Lifetime:** Long-lived (30 days)
- **Storage:** httpOnly cookie (not accessible via JavaScript)
- **Security:** Helps prevent XSS attacks

### Protected Routes
Protected routes require a valid access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

If the access token is expired or invalid, the frontend should:
1. Use the `/refresh` endpoint to get a new access token
2. Retry the original request with the new token
3. If refresh fails, redirect to login

---

## Common Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```
**Cause:** Required fields are missing in the request body

### 401 Unauthorized
```json
{
  "error": "Access token required",
  "path": "auth middleware"
}
```
**Cause:** No access token provided in Authorization header

### 403 Forbidden
```json
{
  "error": "Invalid or expired access token",
  "path": "auth middleware"
}
```
**Cause:** Access token is invalid or expired

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```
**Cause:** Server-side error occurred

---

## Endpoints

### Authentication Endpoints

#### POST /register
Create a new user account and receive authentication tokens.

**Access:** Public  
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| first_name | string | Yes | User's first name |
| last_name | string | Yes | User's last name |
| email | string | Yes | User's email address (must be unique) |
| phone_number | string | Yes | User's phone number (must be unique) |
| password | string | Yes | User's password (will be hashed with Argon2) |
| fn | string | Yes | Company's FN number (must be unique) |
| atu | string | Yes | Company's ATU number (must be unique) |

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

**409 Conflict - Duplicate Email:**
```json
{
  "error": "User with this email already exists"
}
```

**409 Conflict - Duplicate Phone:**
```json
{
  "error": "Ein Account mit der Telefonnumer '+43 123 456789' existiert bereits."
}
```

**409 Conflict - Duplicate FN:**
```json
{
  "error": "Ein Account mit der FN '123456a' existiert bereits."
}
```

**409 Conflict - Duplicate ATU:**
```json
{
  "error": "Ein Account mit der ATU-Nummer 'ATU12345678' existiert bereits."
}
```

**Notes:**
- Refresh token is automatically set as httpOnly cookie
- Password is hashed using Argon2 before storage
- Creates both user and company records in a transaction

---

#### POST /login
Authenticate a user and receive tokens.

**Access:** Public  
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| email | string | Yes | User's email address |
| password | string | Yes | User's password |

**Success Response (200):**
```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": 123,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**

**400 Bad Request - User Not Found:**
```json
{
  "error": "User not found"
}
```

**401 Unauthorized - Invalid Password:**
```json
{
  "error": "Wrong password"
}
```

**Notes:**
- Refresh token is automatically set as httpOnly cookie
- Session is updated with new refresh token and expiration

---

#### POST /refresh
Generate a new access token using a valid refresh token.

**Access:** Public (requires refresh token in cookies)  
**Body Parameters:** None (reads from cookies, or can accept `refreshToken` in body for mobile)

**Alternative Body (for mobile):**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| refreshToken | string | No | Refresh token (if not using cookies) |

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "error": "Refresh token required"
}
```

**403 Forbidden - Invalid Token:**
```json
{
  "error": "Invalid refresh token"
}
```

**403 Forbidden - Expired Token:**
```json
{
  "error": "Refresh token expired or revoked"
}
```

**Notes:**
- Validates token against both JWT signature and database
- Returns new access token with current user data

---

#### GET /verify
Verify the current access token and get user information.

**Access:** Protected (requires valid access token)  
**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "id": 123,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone_number": "+43 123 456789"
}
```

**Notes:**
- Used to validate token and retrieve current user information
- Frontend should call this on app startup to verify session

---

#### POST /logout
Log out the current user by invalidating the refresh token.

**Access:** Protected (requires valid access token)  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Body Parameters:** None

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "Fields missing",
  "message": "Refresh Token or User ID are not provided"
}
```

**Notes:**
- Clears refresh token from database
- Clears refresh token cookie
- Frontend should also clear stored access token

---

### Ride Management Endpoints

#### POST /ride
Create a new ride entry.

**Access:** Public  
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | integer | Yes | ID of the user creating the ride |
| start_address | string | Yes | Starting address of the ride |
| start_time | string | Yes | Start time (ISO 8601 format) |
| start_lat | float | Yes | Starting latitude coordinate |
| start_lng | float | Yes | Starting longitude coordinate |
| end_address | string | Yes | Destination address |
| end_time | string | Yes | End time (ISO 8601 format) |
| end_lat | float | Yes | Destination latitude coordinate |
| end_lng | float | Yes | Destination longitude coordinate |
| duration | string | Yes | Ride duration |
| distance | float | Yes | Ride distance in kilometers |
| ride_type | string | Yes | Type of ride (e.g., "standard", "premium") |
| whole_ride | object | Yes | Complete ride data (JSONB) |

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Ride successfully saved",
  "ride_info": {
    "ride_id": 456,
    "vehicle_id": 78
  }
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "status": "error",
  "code": "MISSING_FIELDS",
  "message": "Missing required fields"
}
```

**500 Internal Server Error:**
```json
{
  "status": "error",
  "message": "Ride could not be created"
}
```

**Notes:**
- `vehicle_id` is currently randomly generated (temporary implementation)
- Transaction-based: all database operations are rolled back on error
- `whole_ride` is stored as JSONB for flexible data storage

---

#### POST /all-rides
Retrieve all rides for a specific user.

**Access:** Public  
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| user_id | integer | Yes | ID of the user |

**Success Response (200):**
```json
{
  "status": "success",
  "ride_count": 5,
  "rides": [
    {
      "ride_id": 456,
      "vehicle_id": 78,
      "start_address": "Hauptstraße 1, Wien",
      "end_address": "Mariahilfer Straße 50, Wien",
      "distance": 5.2,
      "duration": "15:30",
      "start_time": "2024-01-15T10:00:00Z",
      "end_time": "2024-01-15T10:15:00Z",
      "ride_type": "standard",
      "user_id": 123,
      "whole_ride": { /* complete ride data */ }
    }
  ]
}
```

**Error Responses:**

**400 Bad Request - Missing Fields:**
```json
{
  "status": "error",
  "code": "MISSING_FIELDS",
  "message": "Missing required fields"
}
```

**400 Bad Request - No Rides:**
```json
{
  "status": "error",
  "code": "USER_HAS_NO_RIDES",
  "message": "User has no rides"
}
```

**Notes:**
- Returns all rides sorted by the database default order
- Consider adding pagination for users with many rides

---

### Fahrten Endpoints

The Fahrten endpoints manage "Fahrten" (trips/drives) with start and end functionality.

#### POST /fahrten/start
Start a new Fahrt (trip/drive).

**Access:** Public  
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | integer | Yes | ID of the user starting the Fahrt |
| vehicleId | integer | No | ID of the vehicle (optional) |
| lat | float | No | Starting latitude coordinate (optional) |
| lng | float | No | Starting longitude coordinate (optional) |

**Success Response (201):**
```json
{
  "fahrt_id": 789,
  "user_id": 123,
  "vehicle_id": 45,
  "start_time": "2024-01-15T10:00:00Z",
  "lat": 48.2082,
  "lng": 16.3738
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "userId is required"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to start Fahrt"
}
```

**Notes:**
- `vehicleId`, `lat`, and `lng` are optional parameters
- Returns the created Fahrt object with ID and timestamp

---

#### POST /fahrten/:fahrten_id/end
End an existing Fahrt.

**Access:** Public  
**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fahrten_id | integer | Yes | ID of the Fahrt to end |

**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| endKm | float | No | Ending kilometer reading (optional) |
| lat | float | No | Ending latitude coordinate (optional) |
| lng | float | No | Ending longitude coordinate (optional) |

**Success Response (200):**
```json
{
  "fahrt_id": 789,
  "user_id": 123,
  "vehicle_id": 45,
  "start_time": "2024-01-15T10:00:00Z",
  "end_time": "2024-01-15T10:30:00Z",
  "end_km": 150.5,
  "lat": 48.2082,
  "lng": 16.3738
}
```

**Error Responses:**

**400 Bad Request - Invalid ID:**
```json
{
  "error": "Invalid Fahrt ID"
}
```

**400 Bad Request - General Error:**
```json
{
  "error": "Failed to end Fahrt"
}
```

**Notes:**
- All body parameters are optional
- Returns the updated Fahrt object with end time

---

### Account Management Endpoints

#### PUT /account/me
Update the current user's profile information.

**Access:** Protected (requires valid access token)  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| first_name | string | No | New first name |
| last_name | string | No | New last name |
| email | string | No | New email address |

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "user_id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.new@example.com"
  }
}
```

**Error Responses:**

**400 Bad Request - No Data:**
```json
{
  "error": "No data provided",
  "message": "Send first_name/last_name/email"
}
```

**404 Not Found:**
```json
{
  "error": "User not found"
}
```

**409 Conflict:**
```json
{
  "error": "Email already in use"
}
```

**Notes:**
- At least one field must be provided
- Only provided fields are updated
- Email uniqueness is enforced

---

#### DELETE /account
Delete the current user's account.

**Access:** Protected (requires valid access token)  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| password | string | Yes | User's password for confirmation |

**Success Response (200):**
```json
{
  "message": "Account deleted successfully"
}
```

**Error Responses:**

**400 Bad Request - Missing Fields:**
```json
{
  "error": "Fields missing",
  "message": "Refresh Token or User ID are not provided"
}
```

**400 Bad Request - User Not Found:**
```json
{
  "error": "User not found",
  "path": "/deleteacount, line: 43"
}
```

**401 Unauthorized - Invalid Password:**
```json
{
  "error": "Invalid password",
  "path": "/delete/acount"
}
```

**Notes:**
- Requires password confirmation for security
- Clears refresh token cookie
- Cascading delete removes all user-related data
- This action is irreversible

---

### File Storage Endpoints

The File Storage endpoints manage files stored in Vercel Blob storage, including invoices and user avatars.

#### GET /list-blobs/invoices
Retrieve all invoice PDF files from storage.

**Access:** Protected (requires valid access token)  
**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "response": {
    "blobs": [
      {
        "pathname": "Bills/invoice_001.pdf",
        "size": 52480,
        "uploadedAt": "2024-01-15T10:00:00Z",
        "url": "https://..."
      }
    ],
    "cursor": null,
    "hasMore": false
  },
  "actualFiles": [
    {
      "pathname": "Bills/invoice_001.pdf",
      "size": 52480,
      "uploadedAt": "2024-01-15T10:00:00Z",
      "url": "https://..."
    }
  ]
}
```

**Error Responses:**

**500 Internal Server Error:**
```json
{
  "error": "Internal Server Error",
  "path": "invoices"
}
```

**Notes:**
- Returns all PDF files from the `Bills/` prefix
- `actualFiles` filters out empty marker files (size > 0)
- Files are stored in Vercel Blob storage

---

#### GET /list-blobs/avatar
Retrieve user avatar/profile picture.

**Access:** Protected (requires valid access token)  
**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200):**
```json
{
  "response": {
    "blobs": [
      {
        "pathname": "Profile_Picture/john_doe.jpg",
        "size": 15360,
        "uploadedAt": "2024-01-15T10:00:00Z",
        "url": "https://..."
      }
    ],
    "cursor": null,
    "hasMore": false
  },
  "actualFiles": [
    {
      "pathname": "Profile_Picture/john_doe.jpg",
      "size": 15360,
      "uploadedAt": "2024-01-15T10:00:00Z",
      "url": "https://..."
    }
  ]
}
```

**Error Responses:**

**500 Internal Server Error:**
```json
{
  "error": "Internal Server Error"
}
```

**Notes:**
- Currently returns all avatars from `Profile_Picture/` prefix
- **TODO:** Implement user-specific avatar filtering by userId
- `actualFiles` filters out empty marker files (size > 0)

---

#### PUT /list-blobs/avatar
Upload or update user avatar/profile picture.

**Access:** Protected (requires valid access token)  
**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```
**Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| newAvatar | file | Yes | Image file for avatar (multipart upload) |

**Success Response (200):**
```json
{
  "response": {
    "pathname": "Profile_Picture/john_doe.jpg",
    "url": "https://...",
    "downloadUrl": "https://...",
    "size": 15360
  },
  "url": "https://..."
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "Keine Datei im Request gefunden."
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal Server Error",
  "details": "Error message details"
}
```

**Notes:**
- Currently uploads to hardcoded filename `john_doe.[ext]`
- **TODO:** Implement user-specific filenames based on userId
- File extension is preserved from original upload
- Uses multer for file upload handling
- Stored with public access in Vercel Blob

---

## Frontend Integration Guide

### Initial Setup
```typescript
// Configure axios with base URL
const API_URL = import.meta.env.VITE_API_URL;

// For authenticated requests
const accessToken = await AuthStorage.getAccessToken();
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.withCredentials = true; // Enable cookies for refresh token
```

### Error Handling Pattern
```typescript
try {
  const response = await axios.post(`${API_URL}/endpoint`, data);
  return response.data;
} catch (error) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.error;
    
    // Handle specific error cases
    if (status === 401 || status === 403) {
      // Try refreshing token
      const newToken = await refreshAccessToken();
      // Retry request with new token
    }
    
    // Handle other status codes...
  }
}
```

### Token Refresh Flow
1. Access token expires during a request
2. Backend returns 401/403 error
3. Frontend calls `/refresh` endpoint
4. Backend validates refresh token from cookie
5. Backend returns new access token
6. Frontend stores new access token
7. Frontend retries original request

---

## Backend Development Notes

### Adding New Endpoints
1. Create route file in `/backend/routes/`
2. Add JSDoc documentation with route details
3. Import and register in `app.js`
4. Update this API documentation
5. Notify frontend team of changes

### Security Best Practices
- Always use `authenticateToken` middleware for protected routes
- Validate all input parameters
- Use parameterized queries to prevent SQL injection
- Hash passwords with Argon2
- Use httpOnly cookies for refresh tokens
- Implement CORS properly

### Error Response Format
Maintain consistency in error responses:
```javascript
res.status(statusCode).json({
  error: "Brief error description",
  message: "Detailed message (optional)",
  path: "Error location (for debugging)"
});
```

---

## Changelog

### Version 1.0.0 (Current)
- Initial API documentation
- All core authentication endpoints
- Ride management endpoints
- Fahrten (trip/drive) management endpoints
- Account management endpoints
- File storage endpoints (invoices and avatars)

---

## Support & Questions

**Frontend Team:** Umejr Džinović, Casper Zielinski  
**Backend Team:** Markus Rossmann, Mario Shenouda

For API questions, changes, or issues, please create a GitHub issue or discuss in sprint meetings.

---

**Last Updated:** December 2024  
**Maintained by:** Backend Team
