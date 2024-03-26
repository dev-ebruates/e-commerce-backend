const mongoose = require("mongoose")


const CategoryShema = mongoose.Schema(
  {
    name:{type : String , required:true},
    img:{type : String, required:true},
  },
  {
    timestamps:true
  }
);

const Category = mongoose.model("Categeory", CategoryShema);
module.exports = Category;