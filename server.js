const express = require("express");
const app = express();

app.use(express.json({limit:"10mb"}));
app.use(express.static("public"));

let products = [];
let orders = [];

// ===== PRODUCTS =====
app.get("/api/products", (req,res)=>{
  res.json(products);
});

app.get("/api/products/:id",(req,res)=>{
  const product = products.find(p=>p.id==req.params.id);
  res.json(product);
});

app.post("/api/products",(req,res)=>{
  const product = {
    id: Date.now(),
    ...req.body,
    images:req.body.images.slice(0,8)
  };

  products.push(product);
  res.json(product);
});

app.delete("/api/products/:id",(req,res)=>{
  products = products.filter(p=>p.id != req.params.id);
  res.sendStatus(200);
});

// ===== ORDERS =====
app.post("/api/orders",(req,res)=>{
  orders.push({id:Date.now(),...req.body});
  res.sendStatus(200);
});

app.get("/api/orders",(req,res)=>{
  res.json(orders);
});

// ===== ADMIN LOGIN =====
app.post("/admin-login",(req,res)=>{
  if(req.body.code === "11211")
    return res.json({success:true});

  res.json({success:false});
});

app.listen(3000,()=>console.log("🔥 Server Running"));
