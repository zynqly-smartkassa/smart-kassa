# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not open a public GitHub issue**.

Instead, report it privately by contacting the maintainers directly:

- **GitHub:** Open a [Security Advisory](https://github.com/zynqly-smartkassa/smart-kassa/security/advisories/new) (recommended)
- **Email:** Contact one of the maintainers listed in the [README](./README.md#team)

Please include:
- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fix (optional)

We aim to respond within **72 hours** and will keep you informed throughout the process.

---

## Security Architecture

### Authentication

- **JWT-based** authentication with short-lived access tokens (15 min) and long-lived refresh tokens (30 days)
- Refresh tokens are stored in `httpOnly` cookies — not accessible via JavaScript
- Passwords are hashed using **Argon2** (winner of the Password Hashing Competition)
- Multi-device session management via unique `device_id` per session

For a full description of the authentication flow, see [AUTH.md](./AUTH.md).

### Data Protection & GDPR

This application is built for use in Austria and complies with GDPR requirements:

- Account deletion uses a **soft delete** pattern — personal data (name, email, password) is anonymized
- Business records (rides, invoices) are retained for 7 years as required by Austrian tax law (`§ 132 BAO`)
- Refresh tokens are revoked on logout and account deletion

### Transport Security

- All production traffic is served over **HTTPS**
- CORS is configured to allowlist only known origins (see [DEPLOYMENT.md](./docs/DEPLOYMENT.md))

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (`main`) | Yes |
| Older branches | No |
