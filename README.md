# 📦 MERN Stack Product Management API

This is a backend API built using **Node.js**, **Express**, **TypeScript**, and **MongoDB** for managing categories, subcategories, and products. It supports user authentication, wishlist functionality, and API documentation using Swagger.

---

## 🚀 Features

* ✅ User authentication (register, login, logout)
* 🛍️ Product, category & subcategory management
* 📃 Wishlist system (with variant selection)
* 📟 API validation & error handling
* 📚 Swagger API documentation
* 🖼️ Image upload (using multer)

---

## 📁 Folder Structure

```
.
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── swagger.ts
├── server.ts
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/roshindavis15/seclob-task.git
   cd seclob-task/Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```




   ```

3. **Run the server**

   * For development:

     ```bash
     npm run dev
     ```

   * For production:

     ```bash
     npm run build
     npm start
     ```

---

## 🔐 Authentication

* JWT is used for authentication.
* Store the token returned from `/api/auth/login` in localStorage or Authorization header as `Bearer <token>`.

---

## 📖 API Documentation (Swagger UI)

Once the server is running, go to:

```
http://localhost:5000/api-docs
```

You’ll see the Swagger UI, where you can test all API endpoints with authorization.

---

## 🧪 Example API Usage

### Add to Wishlist (POST)

`/api/wishlist/add`

```json
{
  "productId": "682f754dd0b5a0888be23b2f",
  "selectedVariant": {
    "ram": "8 GB",
    "price": 929.99,
    "quantity": 1
  }
}
```

Add the JWT token in the Authorization header:
`Authorization: Bearer <your-token>`

---

## 🚰 Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* TypeScript
* Swagger (OpenAPI 3)
* Multer (image upload)

---

## 🩹 Scripts

```bash
npm run dev      # Start in development mode
npm run build    # Compile TypeScript
npm start        # Run compiled JavaScript
```

---

