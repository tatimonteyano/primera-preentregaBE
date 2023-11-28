import express from "express";
import cartRoutes from "./cartRoutes";
import productRoutes from "./productRoutes";

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Usa las rutas de cart y product como middleware
server.use("/cart", cartRoutes);
server.use("/product", productRoutes);

server.listen(PORT, () => {
  console.log(`Servidor iniciado en ${PORT}`);
});
