const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const User = require("../models/User.js");

const generateRandomAvatar = () => {
  const ramdomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300/img${ramdomAvatar}`;
};

//kullanıcı oluşturma(create- user)
router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password } = req.body;
    const defaultAvatar = generateRandomAvatar();
    //email adresi bir kere kullanılabilir
    //return yaptığımız için aşağıya girmeden devam edecek
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return  res.status(400).json({ error: "Email adress is already registed." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });
    console.log(newUser);
    //veritabanına kayıt ettik
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
      res.status(500).json({ error: "Server Error" });
  }
});



//KULLANICI GİRİŞİ
router.post("/login",async (req,res) => {
  console.log(req.body);
try {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });   
  if(!user){
    return res.status(401).json({error: "Invalid email or password."});
  }   
  const isValidPassword = await bcryptjs.compare(password, user.password);
 
  if(!isValidPassword){
    return res.status(401).json({error: "Invalid email or password."});
  }
  res.status(200).json({
    id: user._id,
    email: user.email,
    username: user.username,
    password: user.password,
    role: user.role,
    avatar: user.avatar,
  });
} catch (error) {
  res.status(500).json({ error: "Server Error" });
}
})

module.exports = router;
