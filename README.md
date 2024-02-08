# Examination System

## Overview

The Examination System is a web application designed for conducting and managing student examinations. It is composed of three main components: AdminClient, UserClient, and Backend.

## Features

- **AdminClient:** Admin interface for managing exams, questions, and user roles.
- **UserClient:** User interface for students to take exams and view results.
- **Backend:** Server-side logic handling exam data, user authentication, and communication between clients.

## Technologies Used

- **Docker:** Containerization for seamless deployment.
- **Terraform:** Infrastructure as Code (IaC) for managing deployment.
- **GitHub:** Version control and collaboration platform.

## Project Structure

- **AdminClient:** Folder containing the Admin client application.
- **UserClient:** Folder containing the User client application.
- **Backend:** Folder containing the server-side logic and API endpoints.

## Deployment

1. **Dockerization:**
   - Build Docker images for each component.
   - Run containers using Docker Compose.

   ```bash
   docker-compose up -d

2. Accessing the Application:

AdminClient: http://localhost:3300
UserClient: http://localhost:3200
Backend API: http://localhost:5000



Unit Tests
Backend unit tests are available in the tests folder.

cd backend
npm install
npm test
