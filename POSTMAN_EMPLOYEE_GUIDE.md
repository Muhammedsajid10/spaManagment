# 📋 Postman Guide: Employee Management

This guide shows you how to manage employees through the API using Postman.

## 🔑 Prerequisites

1. **Admin Login Required**: You need to be logged in as an admin
2. **JWT Token**: Get your admin token by logging in
3. **Postman Collection**: Import the provided collection

---

## 🚀 Step 1: Admin Login

### **Request:**
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/v1/auth/login`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
  ```json
  {
    "email": "admin@spa.com",
    "password": "Admin@123"
  }
  ```

### **Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id_here",
      "firstName": "System",
      "lastName": "Administrator",
      "email": "admin@spa.com",
      "role": "admin"
    },
    "token": "your_jwt_token_here"
  }
}
```

**Save the token** - you'll need it for all subsequent requests!

---

## 👥 Step 2: Create Employee User

### **Request:**
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/v1/auth/signup`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```
- **Body** (raw JSON):
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@spa.com",
    "password": "Employee@123",
    "phone": "+971501234567",
    "role": "employee",
    "gender": "male",
    "address": {
      "street": "Sheikh Zayed Road",
      "city": "Dubai",
      "state": "Dubai",
      "zipCode": "12345",
      "country": "UAE"
    }
  }
  ```

### **Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "new_user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@spa.com",
      "role": "employee"
    }
  }
}
```

---

## 📝 Step 3: Create Employee Profile

**Note**: Since there's no direct employee creation endpoint, you'll need to use the database seeding script or create a custom endpoint. For now, let's use the seeding script approach.

### **Alternative: Use Seeding Script**
```bash
node scripts/seedEmployees.js
```

---

## 🔍 Step 4: View All Employees

### **Request:**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/v1/employees`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```

### **Response:**
```json
{
  "success": true,
  "results": 5,
  "data": {
    "employees": [
      {
        "_id": "employee_id",
        "employeeId": "EMP001",
        "user": {
          "_id": "user_id",
          "firstName": "Sarah",
          "lastName": "Johnson",
          "email": "sarah.johnson@spa.com"
        },
        "position": "massage-therapist",
        "department": "spa-services",
        "specializations": ["deep-tissue-massage", "swedish-massage"],
        "isActive": true
      }
    ]
  }
}
```

---

## 🔍 Step 5: Get Specific Employee

### **Request:**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/v1/employees/EMPLOYEE_ID`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```

### **Response:**
```json
{
  "success": true,
  "data": {
    "employee": {
      "_id": "employee_id",
      "employeeId": "EMP001",
      "user": {
        "_id": "user_id",
        "firstName": "Sarah",
        "lastName": "Johnson",
        "email": "sarah.johnson@spa.com",
        "phone": "+971501234567"
      },
      "position": "massage-therapist",
      "department": "spa-services",
      "hireDate": "2022-01-15T00:00:00.000Z",
      "salary": 8000,
      "specializations": ["deep-tissue-massage", "swedish-massage"],
      "skills": [
        {
          "name": "Swedish Massage",
          "level": "expert",
          "yearsOfExperience": 5
        }
      ],
      "workSchedule": {
        "monday": {
          "isWorking": true,
          "startTime": "09:00",
          "endTime": "18:00"
        }
      }
    }
  }
}
```

---

## ✏️ Step 6: Update Employee

### **Request:**
- **Method**: `PATCH`
- **URL**: `http://localhost:3000/api/v1/employees/EMPLOYEE_ID`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```
- **Body** (raw JSON):
  ```json
  {
    "salary": 8500,
    "specializations": ["deep-tissue-massage", "swedish-massage", "hot-stone-massage"],
    "workSchedule": {
      "monday": {
        "isWorking": true,
        "startTime": "08:00",
        "endTime": "17:00"
      },
      "tuesday": {
        "isWorking": true,
        "startTime": "08:00",
        "endTime": "17:00"
      }
    }
  }
  ```

### **Response:**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "employee": {
      "_id": "employee_id",
      "salary": 8500,
      "specializations": ["deep-tissue-massage", "swedish-massage", "hot-stone-massage"]
    }
  }
}
```

---

## 🔍 Step 7: Search Employees

### **Request:**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/v1/employees/search?q=massage`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```

### **Response:**
```json
{
  "success": true,
  "results": 2,
  "data": {
    "employees": [
      {
        "_id": "employee_id",
        "employeeId": "EMP001",
        "user": {
          "firstName": "Sarah",
          "lastName": "Johnson"
        },
        "position": "massage-therapist"
      }
    ]
  }
}
```

---

## 📊 Step 8: Get Employee Statistics

### **Request:**
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/v1/employees/stats`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```

### **Response:**
```json
{
  "success": true,
  "data": {
    "totalEmployees": 5,
    "activeEmployees": 5,
    "byDepartment": {
      "spa-services": 2,
      "beauty": 2,
      "wellness": 1
    },
    "byPosition": {
      "massage-therapist": 2,
      "esthetician": 1,
      "nail-technician": 1,
      "wellness-coach": 1
    }
  }
}
```

---

## 🕐 Step 9: Update Employee Availability

### **Request:**
- **Method**: `PATCH`
- **URL**: `http://localhost:3000/api/v1/employees/EMPLOYEE_ID/availability`
- **Headers**: 
  ```
  Content-Type: application/json
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```
- **Body** (raw JSON):
  ```json
  {
    "isAvailable": false,
    "unavailableDates": [
      {
        "startDate": "2024-01-15",
        "endDate": "2024-01-20",
        "reason": "Vacation",
        "type": "vacation"
      }
    ]
  }
  ```

---

## 🗑️ Step 10: Delete Employee

### **Request:**
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/v1/employees/EMPLOYEE_ID`
- **Headers**: 
  ```
  Authorization: Bearer YOUR_ADMIN_TOKEN
  ```

### **Response:**
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": null
}
```

---

## 📋 Postman Collection Variables

Set these environment variables in Postman:

```
BASE_URL: http://localhost:3000/api/v1
ADMIN_TOKEN: your_jwt_token_here
```

Then use in requests:
- URL: `{{BASE_URL}}/employees`
- Authorization: `Bearer {{ADMIN_TOKEN}}`

---

## 🔧 Common Employee Data Structure

### **Employee Creation Data:**
```json
{
  "user": {
    "firstName": "Employee",
    "lastName": "Name",
    "email": "employee@spa.com",
    "password": "Employee@123",
    "phone": "+971501234567",
    "role": "employee",
    "gender": "female",
    "address": {
      "street": "Street Address",
      "city": "Dubai",
      "state": "Dubai",
      "zipCode": "12345",
      "country": "UAE"
    }
  },
  "employee": {
    "employeeId": "EMP001",
    "position": "massage-therapist",
    "department": "spa-services",
    "hireDate": "2024-01-01",
    "salary": 8000,
    "commissionRate": 10,
    "specializations": ["deep-tissue-massage", "swedish-massage"],
    "skills": [
      {
        "name": "Swedish Massage",
        "level": "expert",
        "yearsOfExperience": 5
      }
    ],
    "languages": [
      {
        "language": "English",
        "proficiency": "fluent"
      }
    ]
  }
}
```

---

## ⚠️ Important Notes

1. **Admin Access Only**: All employee management requires admin privileges
2. **JWT Token**: Always include the admin token in Authorization header
3. **Validation**: The API validates all input data
4. **Error Handling**: Check response status codes and error messages
5. **Soft Delete**: Employees are soft-deleted (marked as inactive)

---

## 🚨 Error Responses

### **401 Unauthorized:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### **403 Forbidden:**
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### **404 Not Found:**
```json
{
  "success": false,
  "message": "Employee not found"
}
```

### **400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Employee ID is required",
    "Position must be one of: massage-therapist, esthetician, nail-technician"
  ]
}
```

---

**Use this guide to manage your spa employees through the API!** 🎉 