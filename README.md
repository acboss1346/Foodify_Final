# Foodify – Smart Food Ordering and Delivery System

Foodify is a modern, full-stack digital food ordering system designed to streamline the ordering process in college canteens and local restaurants. It solves the problem of long queues and order delays by allowing users to browse menus, place orders online, and track their status in real-time.

## 🚀 Key Features

*   **User Authentication**: Secure login and signup using JWT and bcrypt. Role-based access control (User/Admin).
*   **Menu Management**: Admins can easily add, update, and delete food items with images, prices, and categories.
*   **Smart Cart**: Users can add items to their cart, adjust quantities, and view the total cost before ordering.
*   **Order Management**:
    *   **Users**: Place orders and track status (Pending → Preparing → Ready → Completed) in real-time.
    *   **Admins**: View all incoming orders and update their status.
*   **Search & Filter**: Find food items quickly by category (Snacks, Meals, Drinks) or by name.
*   **Responsive Design**: Built with TailwindCSS for a seamless experience on both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
*   **React.js (v19)**: Component-based UI library.
*   **Vite**: Fast build tool and development server.
*   **TailwindCSS (v4)**: Utility-first CSS framework for styling.
*   **React Router DOM**: For client-side routing.
*   **Axios**: For making HTTP requests to the backend.

### Backend
*   **Node.js & Express.js**: Robust server-side framework.
*   **Prisma ORM**: Modern database toolkit for TypeScript and Node.js.
*   **PostgreSQL**: Powerful, open-source relational database.
*   **JWT (JSON Web Tokens)**: For secure, stateless authentication.
*   **Bcrypt**: For password hashing.

## 📂 Project Structure

```
Foodify2/
├── client/         # React frontend application
│   ├── src/        # Source code (components, pages, etc.)
│   └── ...
├── server/         # Node.js/Express backend
│   ├── src/        # Source code (routes, controllers, etc.)
│   ├── prisma/     # Database schema and migrations
│   └── ...
└── README.md
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   **Node.js** (v18+ recommended)
*   **PostgreSQL** installed and running locally or via a cloud provider (e.g., Neon, Supabase, Railway).

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Foodify2
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="your_super_secret_key"
```

Run database migrations to create tables:
```bash
npx prisma migrate dev --name init
```

Start the backend server:
```bash
npm run dev
```
The server should now be running on `http://localhost:3000`.

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🔌 API Endpoints

### Authentication
*   `POST /api/auth/signup` - Register a new user
*   `POST /api/auth/login` - Login and receive JWT

### Food Items
*   `GET /api/foods` - Get all food items
*   `GET /api/foods/:id` - Get a specific food item
*   `POST /api/foods` - Add a new food item (Admin only)
*   `PUT /api/foods/:id` - Update a food item (Admin only)
*   `DELETE /api/foods/:id` - Delete a food item (Admin only)

### Cart
*   `GET /api/cart` - Get current user's cart
*   `POST /api/cart` - Add item to cart
*   `DELETE /api/cart/:itemId` - Remove item from cart

### Orders
*   `POST /api/orders` - Place a new order
*   `GET /api/orders` - Get user's order history
*   `PUT /api/orders/:id/status` - Update order status (Admin only)

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
