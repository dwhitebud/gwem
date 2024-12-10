# API Documentation

## Overview
This document outlines the API endpoints and their usage in the GWEM application.

## Base URL
Development: `http://localhost:3000/api`
Production: [To be determined]

## Authentication
Authentication is handled through secure JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

### Error Codes
- `401 Unauthorized`: Invalid or missing authentication token
- `403 Forbidden`: Valid token but insufficient permissions
- `419 Token Expired`: Authentication token has expired
- `422 Validation Error`: Invalid request parameters

### Rate Limiting
The API implements rate limiting to ensure fair usage:

- **Standard Users**:
  - 100 requests per minute
  - 5,000 requests per day

- **Premium Users**:
  - 500 requests per minute
  - 25,000 requests per day

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1623456789
```

## Endpoints

### GET /api/health
Health check endpoint to verify API status.

**Response**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "theme": "modern-financial"
}
```

### GET /api/theme
Retrieve current theme configuration.

**Response**
```json
{
  "colors": {
    "primary": "#025584",
    "secondary": "#00D47E",
    "status": {
      "success": "#00D47E",
      "pending": "#94A3B8",
      "error": "#EF4444"
    }
  },
  "typography": {
    "fontFamily": "Helvetica",
    "weights": ["Regular", "Medium", "SemiBold", "Bold"]
  }
}
```

## Error Handling
All API errors follow a standard format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "status": 400
  }
}
```

## Versioning
API versioning will be handled through URL prefixing (e.g., /v1/api/...)

## Security
- All endpoints will use HTTPS in production
- API keys must be included in request headers
- CORS policies will be strictly enforced
- JWT tokens expire after 24 hours
