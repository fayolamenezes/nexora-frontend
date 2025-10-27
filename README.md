# VibeShop Frontend (React)

A modern, minimal e-commerce cart interface.

## Features

- Product grid with images and categories  
- Add, update, and remove items from the cart  
- Checkout with receipt modal (mock order)  
- Responsive design — adaptive layout with sidebar and floating cart  
- Past Orders sidebar (bonus)  
- AI-based product suggestions (bonus)  

## Tech Stack

- React 19
- Vite (for fast local development)
- Custom minimal CSS (Zara-like monochrome style)
- REST API integration with backend

## Folder Structure

```
frontend/
 ┣ src/
 ┃ ┣ api/
 ┃ ┣ components/
 ┃ ┣ styles.css
 ┃ ┗ App.jsx
 ┣ package.json
 ┗ vite.config.js
```

## Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs at **http://localhost:5173** by default.

## Key Components

| Component | Description |
|------------|-------------|
| `ProductsGrid` | Displays products from backend `/api/products` |
| `CartPanel` | Shows cart items with qty update & remove |
| `CheckoutForm` | Collects name/email for mock checkout |
| `ReceiptModal` | Displays mock receipt |
| `OrdersList` | Past orders (bonus) |

## 🧾 Environment

- Backend URL configurable in `src/api/client.js` (default: `http://localhost:4000`)

## UI Theme

Inspired by **Zara’s minimal monochrome style** with clean layout and modern icons.

## Demo Flow

1. Add items to cart (right panel updates)  
2. Modify qty / remove items  
3. Checkout → shows modal receipt  
4. Cart + form reset  
5. View past orders in sidebar  

## Demo Video
 Add Loom/YouTube (unlisted) link here
