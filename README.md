<p align="center">
  <img src="screenshots/vrl-banner.png" alt="Vendor Risk Lens Banner" width="100%">
</p>

<h1 align="center">🛡️ Vendor Risk Lens (VRL)</h1>

<p align="center">
Enterprise Vendor Risk Management Platform with AI-Powered Business Intelligence
</p>

<p align="center">

**ASP.NET Core 10 • React • PostgreSQL • OpenAI • JWT Authentication • Cloud Deployment**

</p>

---

# 🌐 Live Demo

### Frontend

<a href="https://vendor-risk-lens.vercel.app">Vendor Risk Lens UI URL</a>

### Backend API (Swagger)

<a href="https://vendor-risk-lens.onrender.com/swagger">Vendor Risk Lens Swagger URL</a>

---

# 📖 About

Vendor Risk Lens (VRL) is a cloud-hosted enterprise-style Vendor Risk Management platform that helps organizations manage third-party vendors, monitor operational incidents, maintain complete audit visibility, and generate AI-powered business insights.

The application demonstrates modern full-stack development using ASP.NET Core 10, React, PostgreSQL, JWT Authentication, Entity Framework Core, and OpenAI.

The solution is deployed using a modern cloud architecture:

- Frontend hosted on **Vercel**
- Backend hosted on **Render**
- PostgreSQL database hosted on **Neon**
- AI powered by **OpenAI**

---

# 📸 Application Preview

## 🔐 Login

![Login](screenshots/login.png)

Secure authentication using JWT and BCrypt password hashing.

---

## 📊 Dashboard

![Dashboard](screenshots/dashboard.png)

Enterprise dashboard displaying:

- Vendor KPIs
- Compliance Score
- Vendor Risk Distribution
- Incident Statistics
- Recent Vendors
- AI Assistant

---

## 🏢 Vendor Management

![Vendor Management](screenshots/vendors.png)

Features include:

- Vendor CRUD
- Vendor Search
- Vendor Review Tracking
- Vendor Types
- AI Executive Summary
- Audit History
- Risk Ratings

---

## 🤖 AI Executive Summary

![AI Summary](screenshots/ai-summary.png)

Generate business-ready executive summaries including:

- Executive Summary
- Business Observations
- Risk Analysis
- Recommendations

---

## 🚨 Incident Management

![Incident Management](screenshots/incidents.png)

Enterprise incident management featuring:

- Incident CRUD
- Vendor Association
- Severity
- Priority
- Status Tracking
- Resolution Summary
- Search

---

## 👥 User Management

![User Management](screenshots/users.png)

Manage users with:

- User CRUD
- Dynamic Roles
- Search
- Active / Inactive Status

---

## 🧠 Risk Lens AI

![Risk Lens AI](screenshots/risk-lens-ai.png)

Enterprise AI assistant capable of answering business questions such as:

- Show high-risk vendors
- List open incidents
- Vendors due for review
- Critical vendors
- Business insights
- Executive summaries

---

# ✨ Features

## 🔐 Authentication & Security

- JWT Authentication
- BCrypt Password Hashing
- Secure Login & Logout
- Protected API Endpoints
- Protected React Routes
- User Context from JWT

---

## 🏢 Vendor Management

- Vendor CRUD Operations
- Vendor Types
- Vendor Risk Ratings
- Review Tracking
- Soft Delete
- Active / Inactive Vendors
- Enterprise Search
- AI Executive Summary

---

## 🚨 Incident Management

- Incident CRUD
- Automatic Incident Number Generation
- Vendor Association
- Severity Management
- Priority Management
- Status Tracking
- Resolution Summary
- Enterprise Search

---

## 👥 User Management

- User CRUD
- Dynamic Role Management
- Active / Inactive Users
- Enterprise Search

---

## 📊 Dashboard

- KPI Dashboard
- Compliance Score
- Vendor Risk Distribution
- Critical Vendor Metrics
- Open Incident Metrics
- Monthly Statistics
- Recent Vendors

---

## 📝 Audit Logging

Field-level audit tracking including:

- Create History
- Update History
- Delete History
- Previous Values
- New Values
- Username Tracking
- Timestamp History
- Audit History Viewer

---

## 🤖 AI Features

### AI Executive Summary

Generate executive-level vendor summaries using OpenAI.

Includes:

- Executive Summary
- Business Observations
- Risk Analysis
- Recommendations

---

### Risk Lens AI

Enterprise AI assistant that answers natural language business questions.

Workflow:

1. Detect user intent
2. Retrieve only relevant business data
3. Build optimized business context
4. Send context to OpenAI
5. Generate enterprise-ready response

Benefits:

- Reduced token usage
- Better response quality
- Minimal business data exposure

---

# ☁️ Cloud Deployment

| Component | Technology |
|------------|------------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| AI | OpenAI GPT-4.1-mini |

---

# 🔍 Enterprise Search

Enterprise search is available across:

- Vendors
- Incidents
- Users

Implemented using:

- Entity Framework Core
- LINQ
- DTO Projection
- SQL Translation

---

# 🛠️ Tech Stack

## Backend

- ASP.NET Core 10 Web API
- Entity Framework Core
- PostgreSQL
- Npgsql
- OpenAI API
- Swagger
- Dependency Injection

---

## Frontend

- React
- Vite
- TypeScript
- Lucide React
- Recharts
- CSS3
- Responsive Glassmorphism UI

---

## Security

- JWT Authentication
- BCrypt Password Hashing
- Protected APIs
- Protected Routes

---

## Cloud & DevOps

- Docker
- Render
- Vercel
- Neon PostgreSQL
- Git
- GitHub

---

## Development Tools

- Visual Studio Code
- DBeaver
- Postman

---

# 🏗️ Deployment Architecture

```text
                  Users
                     │
                     ▼
          React + Vite (Vercel)
                     │
               HTTPS Requests
                     │
                     ▼
      ASP.NET Core 10 API (Render)
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
  Neon PostgreSQL            OpenAI API
```

---

# 🏗️ Application Architecture

```text
React + Vite
      │
      ▼
ASP.NET Core Web API
      │
      ▼
Business Services
      │
 ┌────┼──────────────┐
 ▼    ▼              ▼
Vendor Incident     User
Service Service    Service
      │
      ▼
Dashboard Service
      │
      ▼
Audit Log Service
      │
      ▼
AI Service
      │
      ▼
OpenAI API
```

---

# 💼 Enterprise Concepts Demonstrated

- Layered Architecture
- Service Pattern
- DTO Pattern
- REST API Design
- Dependency Injection
- Entity Framework Core
- LINQ
- LINQ Joins
- JWT Authentication
- BCrypt Password Hashing
- Audit Logging
- Enterprise Search
- AI Integration
- Cloud Deployment
- PostgreSQL Migration
- Responsive UI

---

# 🎯 Skills Demonstrated

- Full-Stack Development
- REST API Development
- React Development
- Cloud Deployment
- PostgreSQL Migration
- AI Integration
- Authentication & Authorization
- Entity Framework Core
- Enterprise Architecture
- Responsive UI Design

---

# 🖥️ Application Modules

- 🔐 Login
- 📊 Dashboard
- 🏢 Vendors
- 🚨 Incidents
- 👥 Users
- 📝 Audit History
- 🤖 AI Executive Summary
- 🧠 Risk Lens AI

---

# 📂 Project Structure

```text
vendor-risk-lens
│
├── VRL.API
│   ├── Controllers
│   ├── Data
│   ├── DTOs
│   ├── Models
│   ├── Services
│   ├── Migrations
│   └── Program.cs
│
└── vrl-ui
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── layouts
    │   ├── services
    │   └── assets
    └── public
```

---

# 🚀 Current Status

## ✅ Completed

- JWT Authentication
- BCrypt Password Hashing
- Vendor Management
- Incident Management
- User Management
- Dashboard
- Enterprise Search
- DTO Architecture
- LINQ Queries
- Audit Logging
- AI Executive Summary
- Risk Lens AI
- PostgreSQL Migration
- Docker Support
- Cloud Deployment
- Responsive Glassmorphism UI

---

# 🔮 Future Enhancements

- Pagination
- Column Sorting
- Role-Based Authorization
- Email Notifications
- Export to Excel / PDF
- CI/CD with GitHub Actions
- Automated Seed Data
- Docker Compose

---

# 👨‍💻 Repository Purpose

Vendor Risk Lens demonstrates enterprise full-stack software development using modern Microsoft technologies, cloud deployment, and AI integration.

The project showcases:

- ASP.NET Core 10 Web API
- React + Vite
- PostgreSQL
- Entity Framework Core
- JWT Authentication
- BCrypt Password Hashing
- OpenAI Integration
- Cloud Deployment
- Audit Logging
- Enterprise Dashboard
- AI-Powered Business Intelligence

---

<p align="center">
⭐ If you found this project interesting, consider giving it a star!
</p>
