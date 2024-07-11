# IMPLIFY-WEB-APP

## Project Overview

IMPLIFY-WEB-APP is a web application designed to manage employee information efficiently. The project is built using Next.js for the front end and Node.js with Prisma for the back end, connected to a MySQL database. This README provides an overview of the project, its current status, and a roadmap for future development.

## Project Roadmap

### Backend
- [x] Set up MySQL database

- [X] Create User model
- [x] Implement API endpoints for employee management
  - [x] Add employee
  - [x] Update employee
  - [x] Delete employee
  - [x] Fetch employee details
- [x] Implement user authentication
  - [x] Password hashing and security
  - [ ] Implement the user logout
- [x] Validate input data

### Frontend
- [x] Initialize Next.js project
- [x] Set up project structure
- [x] Implement UI components
  - [x] Dashboard
    - [x] Cards
    - [ ] Employees per page
    - [ ] Filter employees by Company
    - [ ] Auto refresh Data
  - [x] Employee management forms
  - [x] Login and registration forms
- [x] Integrate API endpoints with frontend
- [x] Implement authentication flows
  - [X] User login
  - [x] Protected routes (temporarily off)

### Documentation
- [x] Set up project README
- [ ] Document API endpoints
- [ ] Create user guide

## Current Status

### Backend
The backend of the project is almost complete. The MySQL database is set up, but the Prisma ORM is not configured. API endpoints for managing employees are implemented, and basic user authentication is in place. However, password hashing and JWT token validation are still ongoing.

### Frontend
The frontend development is ongoing. The project structure is set up, and basic UI components such as the dashboard cards are implemented. However, forms for employee management, login, and registration are still in progress. Integration of API endpoints and authentication flows are also ongoing.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MySQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/implify-web-app.git
    cd implify-web-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    - Ensure MySQL is installed and running.
    - Create a database for the project. (Or use an existing one)
    - Update the `.env` file with your database credentials.

5. Start the development server:
    ```bash
    npm run dev
    ```

## API Endpoints

### Employees
- `GET /api/employees`: Fetch all employees
- `POST /api/employees`: Add a new employee
- `GET /api/employees/[id]`: Fetch employee details by ID
- `PUT /api/employees/[id]`: Update employee details by ID
- `DELETE /api/employees/[id]`: Delete employee by ID

### Users
- `POST /api/users`: Register a new user
- `POST /api/login`: User login (To be implemented)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add a new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
