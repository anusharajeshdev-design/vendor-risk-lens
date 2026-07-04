# Vendor-Risk Lens (VRL)

Vendor-Risk Lens (VRL) is an enterprise-grade Vendor Risk Management platform that helps organizations monitor third-party vendors, track operational incidents, maintain audit trails, and leverage AI-powered insights for faster decision-making.

Built with modern full-stack technologies, VRL demonstrates enterprise application architecture, secure authentication, AI integration, and responsive business dashboards.

---

## Features

### Authentication & Security

- JWT Authentication
- Secure Login & Logout
- Protected API Endpoints
- Protected React Routes
- User Context from JWT
- Role-Based Access Ready

---

### Vendor Management

- Vendor CRUD Operations
- Vendor Types
- Vendor Risk Ratings
- Active / Inactive Status
- Vendor Review Tracking
- Soft Delete
- Search & Filtering

---

### Incident Management

- Incident CRUD Operations
- Automatic Incident Number Generation
- Severity & Priority Management
- Incident Status Tracking
- Vendor Association
- Assigned User Tracking
- Resolution Summary

---

### User Management

- User CRUD
- Active User Management
- Role Management
- Dynamic Role Dropdowns

---

### Dashboard & Analytics

- KPI Dashboard
- Compliance Score
- Vendor Risk Distribution
- Incident Status Charts
- Recent Vendors
- Monthly Statistics

---

### Audit Logging

- Create Audit Logs
- Update Audit Logs
- Delete Audit Logs
- Field-Level Change Tracking
- Previous vs New Values
- Username Tracking
- Timestamp History

---

### AI Features

#### AI Executive Summary

Generate AI-powered executive summaries for vendors including:

- Executive Summary
- Key Observations
- Risk Recommendations

#### Risk Lens AI

Enterprise AI assistant capable of answering natural language questions such as:

- Show high-risk vendors
- List open incidents
- Show vendors due for review
- Identify critical incidents
- Executive business insights

The AI uses an intent detection engine to retrieve only the required business data before sending context to OpenAI, reducing token usage and improving response quality.

---

## Tech Stack

### Backend

- ASP.NET Core 8 Web API
- Entity Framework Core
- SQL Server
- OpenAI API
- Swagger
- Dependency Injection

### Frontend

- React
- Vite
- Recharts
- Lucide React
- CSS3 (Glassmorphism UI)

### Security

- JWT Authentication
- Authorization
- Protected Routes

### Tools

- GitHub
- Postman
- DBeaver
- Docker (SQL Server)

---

## Architecture

```
React UI
      │
      ▼
ASP.NET Core Web API
      │
      ▼
Business Services
      │
      ├── Vendor Service
      ├── Incident Service
      ├── Dashboard Service
      ├── Audit Log Service
      └── AI Service
               │
               ▼
         OpenAI API
      │
      ▼
SQL Server
```

---

## AI Architecture

Risk Lens AI uses a lightweight intent detection engine that:

1. Detects the user's intent.
2. Retrieves only the required business data.
3. Builds a minimal business context.
4. Sends optimized context to OpenAI.
5. Returns enterprise-ready responses.

This approach reduces token usage, improves response accuracy, and keeps business data exposure minimal.

---

## Screens

- Login
- Dashboard
- Vendors
- Incidents
- Users
- Audit Logs
- AI Executive Summary
- Risk Lens AI

---

## Current Status

### Completed

- Authentication
- Dashboard
- Vendor Management
- Incident Management
- User Management
- Audit Logging
- AI Executive Summary
- Risk Lens AI
- Glassmorphism UI

### In Progress

- Responsive UI
- PostgreSQL Migration
- Cloud Deployment

---

## Planned Enhancements

- Email Notifications
- Excel Export
- Vendor Risk Scoring Engine
- Advanced Dashboard Filters
- AI Incident Assistant
- AI Risk Prediction
- AI Vendor Recommendations

---

## Repository

Enterprise Full-Stack Vendor Risk Management platform demonstrating:

- ASP.NET Core
- React
- SQL Server
- OpenAI Integration
- JWT Authentication
- Enterprise Dashboard
- AI-Powered Business Insights