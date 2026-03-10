# Authentication System

## Overview

- **JWT**-based authentication
- short lived (15min) **access token** saved in either
  - local storage on Web
  - UserDefaults on iOS
  - SharedPreferences on Android
- long lived (30d) **refresh token** stored in httpOnly cookie (also on mobile using `@capacitor/cookies` API) and in DB

## Payload

Every token has a payload, which contains information/statements about the entity (typically the user)

### Refresh Token

The payload of the refresh token contains the `user.id`, that's it

### Access Token

The payload of the access token contains more information than that of the refresh token, such as:

- `user.id`
- `email`
- `name` (firstname + ' ' + lastname)

This is because the access token is being sent more often and may need additional information, where as the refresh token is only used to get a new access token

## Database Interaction

The refresh token and information about the session is stored in a **session** table. This table includes information like _client_ip_, _user_agent_, _device_name_ and a seperate _device_id_ for every device the user is logged in to. So if the User is logged in to his account on the laptop, his device id will be different than the one from his mobile phone or pc or other device. This is needed because if the refresh token is bound to the user account itself and not a separate table, it is not possible for the user to be logged in to the same account on different devices at the same time. This is because on login a new refresh token is generated and sent to the client and also saved/updated in the database. If now the user logs in to his account on a different device, the same action occurs and a different refresh token is saved in the database. The refresh token that is saved on the previous device is now invalid, and the user need to log in again. That's why every device needs a separate device id. In the session table, the device id on it's own is not unique, but in combination with the user id. That's because the device id is stored in the local storage on the browser (and on prefrences on mobile using capacitor). If the user has supposedly more than one account on his device, it would cause problems in the database or the user would need to store two device id's. Instead, the combination of user id and device id needs to be unique.

---

### Register

![Database Interaction when creating Account](./docs/diagramms/AUTH-Database-Interaction-Register-diagram-2025-12-29-142732.png)

---

### Login

![Database Interaction when loging in](./docs/diagramms/AUTH%20Database%20Interaction%20-%20login-2025-12-29-150854.png)

> If the user logs in to the same account, instead of inserting a new row in the session, the session that already exists (with the same user_id and device_id) is getting updated via upsert statement (Update on Conflict, Insert otherwise)

### Log Out

Also (for loging out) a _is_revoked_ colums exists in the **session** table, which is set to true if the user logs out. With this, the refresh token does is not needed to be set to null or a empty string, but one variable needs to be changed. This also makes the `/refresh` api endpoint easier to implement, since if the _is_revoked_ variable is true, the user has to log in again.
When the user logs in again, the variable _is_revoked_ is set to false.

![Database Interaction when loging out](./docs/diagramms/AUTH%20Database%20Interaction%20-%20logout-2025-12-29-152727.png)

> User gets redirected to register/login page when successfull

### Delete Account

Similar works the **_delete account_** functionality, but instead of having a _is_deleted_ column in the session table, both the **company** and the **user** table have it. This is because a log out is a device functionality is on device level, you can log out of your account on your device, but stay logged in on different devices. The delete account functionality is on a account level, that deletes the account. This makes it so every device that was logged in using this account is not logged in anymore, because the account does not exist. That works by using a _is_deleted_ variable in the user table (also a _deleted_at_ timestamp to know when it was deleted). If the Bussiness Owner wants to delete his account, the company also gets deleted.

![Database Interaction when deleting account](./docs/diagramms/AUTH-Database-Interaction-Delete-Account-2025-12-29-155442.png)

#### GDPR (General Data Protection Regulation)

When a user deletes their account, a **soft delete pattern** that balances GDPR requirements with Austrian tax law obligations is used.

**What Gets Deleted**
When a user requests account deletion:

- Personal identifiable information (name, email, password)
- Authentication tokens (access & refresh tokens revoked)
- User preferences and settings
- Personal contact information

**What Gets Retained**
According to Austrian tax law, business records must be retained for **7 years**:

- Company identifiers (ATU number, Firmenbuchnummer)
- Ride records and receipts (anonymized)
- Financial transaction data
- RKSV-compliant signatures and QR codes

**Implementation**
The user record is marked as `deleted_at` with a timestamp and a `is_deleted` variable (soft delete), while personal data fields are anonymized:

```javascript
// Example: Anonymized user after deletion
{
  id: "123",
  email: null,
  name: "Deleted User",
  password: null,
  deleted_at: "2025-01-09T12:00:00Z",
  is_deleted: true,
  company_id: "456",  // Retained for tax records
  role: null
}
```

#### Rollback

If any Query fails in a series of many Queries, a **Rollback** happens, preventing any of the previous changes made by the Queries to be run. So either the whole Series of Queries succeeds, or fails, no in between and no partial updates. This is possible through **Transactions**

## Token Flow

User **creates a account** or **logs in** to his existing account **⟶** both tokens are being sent from the server and stored on the client side.

The server sends the **access token** via **response body** and the **refresh token** via **httpOnly cookie**.

The user want's to do a action that requires the client to send a api request **⟶** in the request the access token is provided in the **HTTP Authorization header** as a **Bearer credential**. Then the access token is being verified on the Server and if valid (and the function used is also successfull) returns a 200 status code and the Client runs whatever functionality the User wanted (log out, delete account, etc.) So if a functionality requires the user_id, instead of sending the user_id, the access token is being sent and verified and decoded on the server. Through this, the user_id can be read from the access token.

If the **access token is expired** **⟶** the Client tries to **refresh** it **via** the **refresh token**. A seperate API End Point is being used for this to send the refresh token via a httpOnly cookie, then on the server, the refresh token in being verified and if valid, a **new access token** is being sent to the Client via response body.

If invalid **⟶** the User is asked to log out and log in again or restart the Application because the refresh token expired and should be renewed.

---

![Token Flow](./docs/diagramms/AUTH%20-%20System%20_%20Smart%20Kassa-2025-12-28-212545.png)

[See online](https://www.mermaidchart.com/app/projects/b9680431-455c-439e-8bd4-b78b7926a678/diagrams/a6c4123b-9c60-44c2-b696-8ea357448360/share/invite/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudElEIjoiYTZjNDEyM2ItOWM2MC00NGMyLWI2OTYtOGVhMzU3NDQ4MzYwIiwiYWNjZXNzIjoiQ29tbWVudCIsImlhdCI6MTc2NzAyNTQzOH0.DicFUBsDIMjzm8X-8Xer9zEoLwx9XZXQ8dXcEyZpBxM)

---

### Accessing the App when already logged in

If the **User** is **already logged** in and tries to go to the home page (or every other page that needs the user to be logged in) and the **access token** is valid (so the user left the app accidently or left but got back on before the access token expired [15 minutes]), than a request to the `/verify` api end point is being sent and the user is able to access the home page.

If the user left the app for longer than 15 minutes and tries to go to the home page (or every other page that needs the user to be logged in) and the **refresh token** is **not expired** (the user is not logged in longer than 30 days) than a request to the `/refresh` api end point is being sent and the access token is sent to the Client via **response body**

Then the access token is being used to sent a request to the `/verify` endpoint to verify the access token and if valid, the user is redirected to the home page.

If either one of the token's is invalid (rather the refresh token), than the user is being sent to the register page to either log in again or create a account.

---

![Auth System when accessing App when already logged in](./docs/diagramms/AUTH%20-%20System%20_%20Smart%20Kassa-2025-12-28-212203.svg)

## Tools

**Tool used to make the charts**

[Mermaid Charts](https://www.mermaidchart.com/)

[![Mermaid Icon](./docs/pictures/mermaid-icon.svg)](https://www.mermaidchart.com/)
