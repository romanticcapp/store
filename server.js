const express = require("express");
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

let products = [];
let orders = [];


// ✅ المنتجات
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.json(product);
});

app.post("/api/products", (req, res) => {

  const product = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount || 0,
    stock: req.body.stock,
    details: req.body.details,
    images: req.body.images.slice(0,8) // حد أقصى 8 صور
  };

  products.push(product);
  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.sendStatus(200);
});


// ✅ الطلبات
app.post("/api/orders", (req, res) => {
  orders.push({
    id: Date.now(),
    ...req.body
  });

  res.sendStatus(200);
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});


// ✅ دخول الادمن
app.post("/admin-login", (req, res) => {

  if (req.body.code === "11211") {
    return res.json({ success: true });
  }

  res.json({ success: false });
});


// ✅ أهم سطر في Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🔥 Server Running on port " + PORT);
});
