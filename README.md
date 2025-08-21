# User Data Manager

A simple Node.js backend project that demonstrates how to manage application data using JSON files instead of databases. This project focuses on Node.js fundamentals, file system operations, and JSON data handling.

## Features

- 📝 Generate and save sample user data into JSON files
- 📖 Read and display user profiles from files
- ➕ Add new users dynamically and update JSON data
- 🔄 Update existing user information
- 🗑️ Delete users from the system
- 📊 View statistics and file information
- 🌐 RESTful API endpoints for all operations
- 🎲 Random user data generation with realistic information

## Project Structure

```
user-data-manager/
├── src/
│   ├── types/
│   │   └── User.ts              # User interface definitions
│   ├── utils/
│   │   ├── fileManager.ts       # File operations and data management
│   │   └── userGenerator.ts     # Random user data generation
│   ├── server.ts                # Express API server
│   ├── generateUsers.ts         # CLI script to generate users
│   └── displayUsers.ts          # CLI script to display users
├── data/
│   └── users.json              # JSON data storage (created automatically)
├── dist/                       # Compiled JavaScript files
└── README.md
```

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Usage

### 1. Start the API Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` with the following endpoints:

- `GET /health` - Health check
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Add new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/generate-users` - Generate sample users
- `GET /api/stats` - Get file statistics

### 2. Generate Sample Users (CLI)

```bash
npm run generate-users
```

This will create 10 sample users. You can also specify a custom number:

```bash
node dist/generateUsers.js 25
```

### 3. Display Users (CLI)

```bash
npm run display-users
```

This will show all users with statistics and file information.

### 4. API Examples

#### Generate 15 sample users:
```bash
curl -X POST http://localhost:3000/api/generate-users \
  -H "Content-Type: application/json" \
  -d '{"count": 15}'
```

#### Get all users:
```bash
curl http://localhost:3000/api/users
```

#### Add a new user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "city": "New York",
    "country": "United States",
    "occupation": "Software Engineer",
    "phoneNumber": "+1 (555) 123-4567"
  }'
```

#### Update a user:
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"age": 31, "city": "San Francisco"}'
```

#### Get statistics:
```bash
curl http://localhost:3000/api/stats
```

## Data Structure

Each user has the following properties:

```typescript
interface User {
  id: string;           // Unique identifier
  firstName: string;    // First name
  lastName: string;     // Last name
  email: string;        // Email address (unique)
  age: number;          // Age in years
  city: string;         // City of residence
  country: string;      // Country of residence
  occupation: string;   // Job title/occupation
  phoneNumber: string;  // Phone number
  joinDate: string;     // Date joined (YYYY-MM-DD)
  isActive: boolean;    // Account status
  avatar?: string;      // Optional profile picture URL
}
```

## Key Learning Concepts

This project demonstrates:

1. **File System Operations**: Reading from and writing to JSON files
2. **Data Validation**: Ensuring data integrity and handling errors
3. **TypeScript**: Strong typing for better code quality
4. **Express.js**: Building RESTful API endpoints
5. **Error Handling**: Proper error management and user feedback
6. **CLI Tools**: Creating command-line utilities
7. **Data Generation**: Creating realistic sample data
8. **JSON Manipulation**: Working with JSON data structures

## Scripts

- `npm start` - Run the compiled server
- `npm run dev` - Run the server in development mode with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run generate-users` - Generate sample user data
- `npm run display-users` - Display all users and statistics

## Next Steps

This project provides a foundation for more advanced backend development:

- Add database integration (MongoDB, PostgreSQL, etc.)
- Implement authentication and authorization
- Add data validation with libraries like Joi or Yup
- Create a frontend interface
- Add unit and integration tests
- Implement logging and monitoring
- Add API documentation with Swagger

## License

This project is for educational purposes and is free to use and modify.