
### Live preview
You can view the live preview of this by clicking this link
(Chatting-app)[https://chatting-app-pm8f.onrender.com]
# Chatting-app

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

*   User authentication (login/signup) with JWT.
*   Real-time messaging with Socket.io.
*   User profiles with profile picture uploads.
*   RESTful API for managing users, messages, and authentication.

## Tech Stack

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web development.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **React Router:** For routing in the React application.
*   **Socket.io Client:** For real-time communication with the server.
*   **Axios:** For making HTTP requests to the backend API.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A minimal and flexible Node.js web application framework.
*   **MongoDB:** A NoSQL database for storing application data.
*   **Mongoose:** An ODM library for MongoDB and Node.js.
*   **Socket.io:** For enabling real-time, bidirectional communication.
*   **JSON Web Token (JWT):** For secure user authentication.
*   **Bcrypt:** For hashing passwords.
*   **Cloudinary:** For cloud-based image and video management.
*   **Multer:** For handling `multipart/form-data`, used for file uploads.

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm installed on your machine.
*   MongoDB installed and running.

### Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/damodara2006/Chatting-app.git
    cd Chatting-app
    ```

2.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following variables. Replace the placeholder values with your actual credentials.

    ```env
    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

## Usage

1.  **Start the backend server:**
    ```sh
    cd backend
    npm run dev
    ```
    The server will start on `http://localhost:8000` (or the port you specified in your `.env` file).

2.  **Start the frontend development server:**
    ```sh
    cd ../frontend
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

