const express = require("express");
const app = express();

app.use(express.json({limit:"50mb"}));
app.use(express.static("public"));

let products = [];
let orders = [];


// ✅ المنتجات
app.get("/api/products",(req,res)=>{
res.json(products);
});

app.get("/api/products/:id",(req,res)=>{
res.json(products.find(p=>p.id==req.params.id));
});

app.post("/api/products",(req,res)=>{

const product={
id:Date.now(),
...req.body
};

products.push(product);

res.json(product);
});

app.delete("/api/products/:id",(req,res)=>{

products = products.filter(p=>p.id!=req.params.id);

res.sendStatus(200);
});


// ✅ الطلبات
app.post("/api/orders",(req,res)=>{

orders.push({
id:Date.now(),
date:new Date(),
...req.body
});

res.sendStatus(200);
});

app.get("/api/orders",(req,res)=>{
res.json(orders);
});


// ✅ ادمن
app.post("/admin-login",(req,res)=>{

if(req.body.code==="11211"){
return res.json({success:true});
}

res.json({success:false});
});



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("🔥 SERVER RUNNING");
});
