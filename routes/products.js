const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

//Product oluşturma
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
});

//tüm ürünleri getirme (Read All)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
    console.log(`Gönderilen product sayısı: ${products.length}`);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

//belirli bir product getirme (read-single)
router.get("/:productId", async (req, res) => {
  try {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

//product güncelleme

router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
//product silme DElete
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//ürünleri isme göre arama
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const products = await Product.find({
      //burada regex  her bir karakterde arama için  a dedimi hemen a içinde olanları getirecek -- options ise büyük küçük harf duyarsızlığı için  
      name: {$regex: productName, $options:"i"}
    })
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
