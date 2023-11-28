import { Router } from "express";
import CartManager from "../classes/CartManager.js";
import ProductManager from "../classes/ProductManager.js";
const router = Router();

const cartManager = new CartManager("carritos.json");
const carts = cartManager.getCarts();