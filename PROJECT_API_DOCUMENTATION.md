# Project API Documentation

This document describes the Project API endpoints and their usage.

## Base URL
```
/api/projects
```

## Endpoints

### 1. Create Project
**POST** `/api/projects`

Creates a new project.

**Request Body:**
```json
{
  "project_id": "PROJ001",
  "project_name": "E-Commerce Platform",
  "description": "Online shopping platform with payment integration",
  "client_name": "TechCorp Inc",
  "country": "USA",
  "phone_no": 1234567890,
  "email": "contact@techcorp.com",
  "state": "California",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31",
  "kloc": 50.5,
  "project_status": "IN_PROGRESS",
  "user_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 1,
    "project_id": "PROJ001",
    "project_name": "E-Commerce Platform",
    "description": "Online shopping platform with payment integration",
    "client_name": "TechCorp Inc",
    "country": "USA",
    "phone_no": 1234567890,
    "email": "contact@techcorp.com",
    "state": "California",
    "start_date": "2024-01-01T00:00:00.000Z",
    "end_date": "2024-12-31T00:00:00.000Z",
    "kloc": 50.5,
    "project_status": "IN_PROGRESS",
    "user_id": 1
  }
}
```

### 2. Get All Projects
**GET** `/api/projects`

Retrieves all projects with optional filtering.

**Query Parameters:**
- `includeUser=true` - Include user information
- `includeModules=true` - Include modules information
- `status=IN_PROGRESS` - Filter by project status
- `search=searchTerm` - Search in project name, project_id, or client_name

**Example:**
```
GET /api/projects?includeUser=true&status=IN_PROGRESS&search=ecommerce
```

**Response:**
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": [
    {
      "id": 1,
      "project_id": "PROJ001",
      "project_name": "E-Commerce Platform",
      "project_status": "IN_PROGRESS",
      "user": {
        "id": 1,
        "user_id": "admin001",
        "first_name": "System",
        "last_name": "Administrator",
        "email": "admin@company.com"
      }
    }
  ],
  "count": 1
}
```

### 3. Get Project by ID
**GET** `/api/projects/:id`

Retrieves a specific project by its numeric ID.

**Query Parameters:**
- `includeUser=true` - Include user information
- `includeModules=true` - Include modules information

**Example:**
```
GET /api/projects/1?includeUser=true&includeModules=true
```

### 4. Get Project by Project ID
**GET** `/api/projects/project-id/:projectId`

Retrieves a specific project by its project_id (string identifier).

**Example:**
```
GET /api/projects/project-id/PROJ001
```

### 5. Update Project
**PUT** `/api/projects/:id`

Updates an existing project.

**Request Body:** (partial update supported)
```json
{
  "project_name": "Updated E-Commerce Platform",
  "project_status": "COMPLETED",
  "end_date": "2024-11-30"
}
```

### 6. Delete Project
**DELETE** `/api/projects/:id`

Deletes a project by its ID.

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### 7. Get Projects by Status
**GET** `/api/projects/status/:status`

Retrieves all projects with a specific status.

**Valid Status Values:**
- `PLANNED`
- `IN_PROGRESS`
- `COMPLETED`
- `CANCELLED`

**Example:**
```
GET /api/projects/status/IN_PROGRESS
```

### 8. Get Projects by User ID
**GET** `/api/projects/user/:userId`

Retrieves all projects assigned to a specific user.

**Example:**
```
GET /api/projects/user/1
```

### 9. Get Project Statistics
**GET** `/api/projects/statistics`

Retrieves project statistics summary.

**Response:**
```json
{
  "success": true,
  "message": "Project statistics retrieved successfully",
  "data": {
    "total": 10,
    "planned": 2,
    "inProgress": 5,
    "completed": 2,
    "cancelled": 1
  }
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Validation Rules

### Required Fields for Creation:
- `project_id` - Must be unique
- `project_name` - Cannot be empty
- `start_date` - Must be valid date format
- `project_status` - Must be one of: PLANNED, IN_PROGRESS, COMPLETED, CANCELLED

### Optional Fields:
- `description`, `client_name`, `country`, `phone_no`, `email`, `state`, `end_date`, `kloc`, `user_id`

### Additional Validations:
- `end_date` must be after `start_date`
- `email` must be valid email format
- `project_status` must be one of the valid enum values
- `project_id` must be unique across all projects

## Usage Examples

### Creating a Project
```javascript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    project_id: 'PROJ002',
    project_name: 'Mobile Banking App',
    start_date: '2024-02-01',
    project_status: 'PLANNED'
  })
});
```

### Getting All Projects with Filters
```javascript
const response = await fetch('/api/projects?includeUser=true&status=IN_PROGRESS');
const data = await response.json();
```

### Updating a Project
```javascript
const response = await fetch('/api/projects/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    project_status: 'COMPLETED',
    end_date: '2024-12-15'
  })
});
```
