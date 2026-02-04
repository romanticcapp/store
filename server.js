const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

let products = [];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const product = { id: Date.now(), ...req.body };
  products.push(product);
  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
