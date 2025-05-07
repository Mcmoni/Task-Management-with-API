# Task Manager API

A RESTful API for managing tasks built with TypeScript and Express.

## Features

- Create, read, update, and delete tasks
- Task prioritization and status tracking
- Input validation with Joi
- Error handling middleware
- Unit and integration tests with Jest
- Code quality tools: ESLint and Prettier

## Project Structure

```
.
├── src/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Data models
│   ├── repositories/      # Data access layer
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── validators/        # Input validation
│   └── index.ts           # Application entry point
├── .env.example           # Environment variables template
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── .prettierrc            # Prettier configuration
├── jest.config.js         # Jest configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mcmoni/task-manager-api.git
   cd task-manager-api
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file to configure your environment variables if needed.

## Usage

### Development

Start the development server with hot-reloading:

```bash
npm run dev
# or
yarn dev
```

The server will be available at `http://localhost:3000`.

### Building for Production

Compile the TypeScript code to JavaScript:

```bash
npm run build
# or
yarn build
```

### Running in Production

Start the production server:

```bash
npm start
# or
yarn start
```

## API Endpoints

| Method | Endpoint      | Description                |
|--------|---------------|----------------------------|
| GET    | /api/tasks    | Get all tasks              |
| GET    | /api/tasks/:id | Get task by ID            |
| POST   | /api/tasks    | Create a new task          |
| PUT    | /api/tasks/:id | Update an existing task   |
| DELETE | /api/tasks/:id | Delete a task             |

### Example Requests

#### Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager API project",
    "priority": "high"
  }'
```

#### Get All Tasks

```bash
curl http://localhost:3000/api/tasks
```

## Testing

Run all tests:

```bash
npm test
# or
yarn test
```

The test coverage report will be generated in the `coverage` directory.

## Code Quality

### Linting

Check for linting errors:

```bash
npm run lint
# or
yarn lint
```

### Formatting

Format code with Prettier:

```bash
npm run format
# or
yarn format
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
