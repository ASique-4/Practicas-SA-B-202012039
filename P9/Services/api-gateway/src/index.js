import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = 5000;

app.use("/users", createProxyMiddleware({ target: "http://users-service:5001", changeOrigin: true }));
app.use("/products/graphql", createProxyMiddleware({
  target: "http://products-service:5002",
  changeOrigin: true,
  pathRewrite: { "^/products/graphql": "/graphql" }
}));
app.use("/orders/graphql", createProxyMiddleware({
  target: "http://orders-service:5003",
  changeOrigin: true,
  pathRewrite: { "^/orders/graphql": "/graphql" }
}));
app.use("/inventory", createProxyMiddleware({ target: "http://inventory-service:5004", changeOrigin: true }));

app.use("/chatbot", createProxyMiddleware({ target: "http://chatbot-service:5010", changeOrigin: true }));


app.listen(port, () => {
  console.log(`API Gateway running at http://localhost:${port}`);
});
