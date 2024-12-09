
# HealthPlus - Detailed Integrated Documentation

## 1. Introduction
The HealthPlus application is a Salesforce Lightning-based platform developed to streamline fitness center operations. It includes features for membership management, class scheduling, customer tracking, and analytics.

### Project Goals
- Increase membership sign-ups by 20% within the next year.
- Improve retention rates by 25% over 6 months.
- Automate 80% of administrative tasks by year-end.
- Enhance revenue from personal training and classes by 30%.

### Scope
#### In-Scope:
- Membership management.
- Class scheduling and bookings.
- Customer tracking.
- Analytics dashboard.

#### Out-of-Scope:
- Billing automation.
- Mobile app development.

---

## 2. Project Structure

### 2.1 Back-End (Spring Boot)
```
src/
├── main/
│   ├── java/ca/seneca/healthplussalesforcelightning/
│   │   ├── controller/    # Handles API requests.
│   │   ├── model/         # Entity classes for database tables.
│   │   ├── repository/    # Interfaces for CRUD operations.
│   │   ├── service/       # Implements business logic.
│   │   └── HealthPlusSalesforceLightningApplication.java
│   ├── resources/
│       └── application.properties # App configurations.
└── test/                   # Unit tests.
```

### 2.2 Front-End (React.js)
```
src/
├── components/            # UI components (e.g., Dashboard, Member List).
├── styles/                # CSS files for styling.
├── utils/                 # Helper functions.
├── App.js                 # Main app entry point.
├── index.js               # Renders the app.
└── assets/                # Images and fonts.
```

---

## 3. Back-End Documentation

### 3.1 Controllers

#### AuthController
**File Path**: `src/main/java/ca/seneca/healthplussalesforcelightning/controller/AuthController.java`  
Handles user authentication and authorization.

**Example Function**:
```java
@PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
    String token = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
    return ResponseEntity.ok(new JwtResponse(token));
}
```
- **Parameters**: `LoginRequest` with fields `username` and `password`.
- **Returns**: A JWT token on successful authentication.

---

### 3.2 Models

#### Users
Represents user data with roles like Admin or Member.

**Code Example**:
```java
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String role;

    // Getters and Setters
}
```
- **Fields**: `id`, `name`, `email`, `role`.
- **Annotations**:
  - `@Entity`: Marks it as a database entity.
  - `@Id`: Indicates the primary key.

---

### 3.3 Services

#### MemberService
Implements business logic for managing members.

**Example Function**:
```java
public Members addMember(Members member) {
    return membersRepository.save(member);
}
```
- **Purpose**: Saves a new member to the database.
- **Parameters**: `Members` object.
- **Returns**: The saved `Members` entity.

---

## 4. Front-End Documentation

### 4.1 Components

#### Dashboard
**File Path**: `src/components/Dashboard.jsx`  
Displays an overview of activities.

**Code Example**:
```jsx
const Dashboard = ({ classes, members }) => (
    <div>
        <h1>Dashboard</h1>
        <p>Classes Today: {classes.length}</p>
        <p>Members Active: {members.length}</p>
    </div>
);
export default Dashboard;
```
- **Props**: `classes`, `members`.
- **Purpose**: Displays the total number of active classes and members.

---

### 4.2 Utils

#### membershipPlans.js
**File Path**: `src/utils/membershipPlans.js`

**Code Example**:
```javascript
export const calculateMembershipCost = (plan, duration) => {
    const costPerMonth = plan === "Premium" ? 50 : 30;
    return costPerMonth * duration;
};
```
- **Parameters**: `plan` (string), `duration` (number).
- **Returns**: Total cost of the membership.

---

## 5. API Documentation

### Example: Create a Booking
#### Endpoint: **POST** `/api/bookings`
**Request**:
```json
{
  "memberId": 1,
  "classId": 2
}
```
**Response**:
```json
{
  "message": "Booking created successfully!"
}
```

---

## 6. Visual References

- **Dashboard**:
  ![Dashboard](images/dashboard.png)

---

## 7. Setup Instructions

### 7.1 Back-End
1. Clone the repository:
   ```bash
   git clone <back-end-repo-url>
   ```
2. Navigate to the project folder:
   ```bash
   cd healthplus-backend
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### 7.2 Front-End
1. Navigate to the project:
   ```bash
   cd healthplus-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   npm start
   ```

---

## 8. Known Issues and Future Enhancements

- **Current Limitations**:
  - No billing integration.
  - Limited analytics features.

- **Future Plans**:
  - Mobile app for on-the-go access.
  - Advanced reporting with AI integration.
