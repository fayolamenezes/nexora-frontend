import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:4000/api" });

export const fetchProducts = () => api.get("/products").then(r => r.data);
export const getRecs = (productId) => api.get("/recs", { params: { productId } }).then(r => r.data);

export const getCart = () => api.get("/cart").then(r => r.data);
export const addToCart = (payload) => api.post("/cart", payload).then(r => r.data); // increment add
export const updateQty = (payload) => api.put("/cart", payload).then(r => r.data);  // set absolute qty
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`).then(r => r.data);
export const checkout = (payload) => api.post("/checkout", payload).then(r => r.data);

export const listOrders = () => api.get("/orders").then(r => r.data);
