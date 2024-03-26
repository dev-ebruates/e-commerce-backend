const express = require("express");
const router = express.Router();

//diğer route dosyalarını içe aktarıyoruz
const  productRoute = require("./products.js");
const  categoryRoute = require("./categories.js");
const usersRoute = require("./auth.js")
const couponRoute = require("./coupons.js")
const userRoute = require("./users.js")
const paymentRoute = require("./payment.js");


//her route u ilgili yol altında kullanıyoruz

router.use("/products", productRoute)
router.use("/user", userRoute)
router.use("/categories", categoryRoute)
router.use("/coupons", couponRoute)
router.use("/payment", paymentRoute);



module.exports = router;
