# Apex Recruit Job Portal

## Discover Your Career Opportunities

### Introduction

Welcome to Apex Recruit, your go-to job portal for discovering exciting career opportunities. This readme will guide you through the essential features of the platform, ensuring you make the most of your job-seeking experience.

## Table of Contents

- [Links](#links)
- [Installation](#installation--getting-started)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## Links

- **Website URL:** [Apex Recruit](https://apexrecruit.netlify.app/)
- **Backend Deployed URL:** [Apex Recruit API](https://apexrecruit-api-flask-app.onrender.com)

### **Installation & Getting Started**

1. **Clone the repository:** `https://github.com/Biswajit2595/ApexRecruit.git`
2. **Set up a virtual environment:** `python -m venv venv`
3. **Activate the virtual environment:**
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. **Install dependencies:** `pip install -r requirements.txt`
5. **Start your job-seeking journey:** `flask run`

## Features

### Hiring Manager Features:

- **Post Jobs to hire top applicants.**
- **Get Recommendations of Applicants for a Job Post.**
- **OpenAI Integration for Applicant recommendations.**

### Jobseeker Features:

- **Explore job postings from leading companies.**
- **Update and manage profiles.**
- **Keep track of your application status.**

### **API Endpoints**

#### **Authentication**

- `POST /api/jobsekers/signup` - Register a new job seeker.
- `POST /api/hiringmanager/signup` - Register a new Hiring Manager.
- `POST /api/jobsekers/login` - Log in an existing job seeker.
- `POST /api/hiringmanager/login` - Log in an existing Hiring Manager.

#### **Job Postings**

- `POST /api/jobs/create` - Create a new Job Posting.
- `GET /api/jobs/created` - Get all the postings created by the hiring manager.
- `GET /api/jobs/get/all` - Retrieve all job postings.
- `GET /api/jobs/get/:id` - Retrieve job posting details.
- `PUT/PATCH /api/jobs/update/:id` - Update job posting details.
- `DELETE /api/jobs/delete/:id` - Delete a job posting.

#### **Applications**

- `GET /api/applications` - Retrieve all job applications.
- `GET /api/applications/job/:id` - Retrieve a particular job application.
- `GET /api/applications/get/:id` - Retrieve details of a particular job post.
- `POST /api/applications/apply/:id` - Apply to a particular job post.
- `PUT/PATCH /api/applications/update/:id` - Update a job post.
- `DELETE /api/applications/update/:id` - Delete a job post.
- `POST /api/applications/recommendations/:id` - Get recommendations of applicants for a job post.

## Tech Stack

- **Chakra UI:** Craft visually appealing and responsive user interfaces.
- **React.js:** Build dynamic and interactive components.
- **Redux:** Manage state effectively.
- **PostgreSQL:** Store job posts, applications, skill sets, and user data securely.
- **Flask:** Handle server-side logic seamlessly.

## Screenshots
