# Apex Recruit Job Portal

## Discover Your Career Opportunities

### Introduction

Welcome to Apex Recruit, your go-to job portal for discovering exciting career opportunities. This readme will guide you through the essential features of the platform, ensuring you make the most of your job-seeking experience.

## Table of Contents

- [Links](#links)
- [Installation](#installation--getting-started)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)

## Links

- **Website URL:** [Apex Recruit](https://apexrecruit.netlify.app/)
- **Backend Deployed URL:** [Apex Recruit API](https://apexrecruit-api-flask-app.onrender.com)

# Installation & Getting Started

## Backend

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Biswajit2595/ApexRecruit.git
    ```

2. **Navigate to the backend folder:**
    ```bash
    cd ApexRecruit/backend
    ```

3. **Set up a virtual environment:**
    ```bash
    python -m venv venv
    ```

4. **Activate the virtual environment:**
    - On Windows: `venv\Scripts\activate`
    - On macOS/Linux: `source venv/bin/activate`

5. **Install backend dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

6. **Start the backend server:**
    ```bash
    flask run
    ```

## Frontend

1. **Navigate to the frontend folder:**
    ```bash
    cd ApexRecruit/frontend
    ```

2. **Install frontend dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend application:**
    ```bash
    npm run dev
    ```

Now, you're ready to explore career opportunities, post jobs, and experience a seamless job-seeking journey with Apex Recruit!


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

## Home Page
![Screenshot 2023-12-04 005854](https://github.com/Biswajit2595/ApexRecruit/assets/115461295/d8b070f7-ea5b-45b9-b306-8f1b1f4cb0cd)

## Applications Page
![applicstion](https://github.com/Biswajit2595/ApexRecruit/assets/115461295/99039e56-40f0-47a5-bd9d-60b787e21797)

## Login Page
![Screenshot 2023-12-04 010015](https://github.com/Biswajit2595/ApexRecruit/assets/115461295/2e9b1579-d837-4ce2-b7d7-80ef54a66a8e)

## SignIn Page
![Screenshot 2023-12-04 010044](https://github.com/Biswajit2595/ApexRecruit/assets/115461295/dae4d74d-e989-4639-bc11-7a7f73563905)

## Profile And Job Post Creation
![Screenshot 2023-12-04 010323](https://github.com/Biswajit2595/ApexRecruit/assets/115461295/d4bdf360-942b-4113-b90b-6221ec20fb47)
