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

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Versioning
API versioning will be handled through URL prefixing (e.g., /v1/api/...)

## Security
- All endpoints will use HTTPS in production
- API keys must be included in request headers
- CORS policies will be strictly enforced
- JWT tokens expire after 24 hours
