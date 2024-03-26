const mongoose = require("mongoose")


const CouponShema = mongoose.Schema(
  {
    //kupon kodu
    code:{type : String , required:true},
    //indirim oranı
    discountPercent:{type : Number, required:true},
  },
  {
    timestamps:true
  }
);

const Coupon = mongoose.model("Coupon", CouponShema);
module.exports = Coupon;