
# HostelWorld Backend API

A RESTful API for a hostel booking platform built with Node.js, Express, and MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Update the `.env` file with your MongoDB credentials:
   ```
   MONGODB_URI=mongodb+srv://<db_username>:<db_password>@hostelworld.pcxioke.mongodb.net/hostelworld?retryWrites=true&w=majority&appName=HostelWorld
   JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
   ```

3. **Seed the Database**
   ```bash
   npm run seed
   ```

4. **Start the Server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Hostels
- `GET /api/hostels` - Get all hostels (with optional city filter)
- `GET /api/hostels/:id` - Get hostel by ID
- `POST /api/hostels/:id/reviews` - Add review to hostel (auth required)

### Bookings
- `POST /api/bookings` - Create new booking (auth required)
- `GET /api/bookings/my-bookings` - Get user's bookings (auth required)
- `GET /api/bookings/:id` - Get booking by ID (auth required)

## Query Parameters

### GET /api/hostels
- `city` - Filter by city name (case-insensitive)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

Example: `/api/hostels?city=London&page=1&limit=5`

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Schema

### User
- name, email, password, role (user/admin), timestamps

### Hostel
- name, city, address, description, pricePerNight, rating, image, images[], amenities[], reviews[], totalBeds, availableBeds, timestamps

### Booking
- user (ref), hostel (ref), checkIn, checkOut, guests, totalPrice, status, paymentStatus, timestamps

## Development

The server runs on port 5000 by default. CORS is configured to allow requests from `http://localhost:5173` (Vite dev server).

Make sure to:
1. Replace the MongoDB credentials in `.env`
2. Change the JWT_SECRET in production
3. Update CORS origins for production deployment
