# 🛍️ SimiPhy - E-commerce Web App

SimiPhy is a fully functional e-commerce web application built with React, Firebase, and TailwindCSS. It supports product browsing, filtering, cart management, wishlist, user authentication, and order tracking.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Google and Email/Password Login (Firebase Auth)
  - Secure Session Handling

- 🛒 **Shopping Cart & Wishlist**
  - Add, remove, and manage quantity
  - Wishlist saved with Firebase or local storage

- 🔍 **Smart Product Search**
  - Live search filtering
  - Toggle view (Grid/List)

- 📦 **Order Management**
  - Order creation & storage
  - Order history by user
  - Local & Firebase-based persistence

- 🧾 **Profile Management**
  - Edit and save user profile
  - Address persistence with Firestore

- 📌 **Pincode Selection**
  - Editable pincode stored in `localStorage`

- 🖼️ **Product Detail Page**
  - Reviews with star ratings
  - Related/recommended products

---

## 🧰 Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Firebase Auth, Firestore (for profile & orders)
- **APIs:** [DummyJSON](https://dummyjson.com/products)
- **Authentication:** Firebase (Google, Email/Password)
- **Storage:** localStorage + Firestore (hybrid persistence)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/simiphy-ecommerce.git
cd simiphy-ecommerce

```
###  2. Install Dependencies
```bash
npm install

```
###  3.Setup Firebase
Create a Firebase project and enable:

- Authentication (Google & Email/Password)
- Firestore (for profile & orders)


### 4. Configure Environment Variables
Create a .env file in the root directory:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
```
---

### 5. Start the App
```bash
npm run dev
```
The app will be available at http://localhost:5173

---

## 📁 Folder Structure

```bash
src/
│
├── components/       # Reusable UI components (Navbar, ProductCard, etc.)
├── context/          # Cart & Wishlist context providers
├── pages/            # Main route pages (Home, Cart, Profile, Orders, etc.)
├── firebase.js       # Firebase config
├── App.jsx
└── main.jsx
```

## 🎨 Customization Ideas
- Add Stripe/Razorpay for payments
- Connect to a real product database
- Add image carousel or zoom on product detail
- Build admin dashboard for product management

## 📸 Screenshots


## 📄 License
This project is open-source under the MIT License.

## 🤝 Contribute
Pull requests are welcome. Feel free to open an issue if you find a bug or have a feature request.

## 💬 Credits
Created with ❤️ by Nimish Berwal