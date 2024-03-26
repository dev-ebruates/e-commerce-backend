const mongoose = require("mongoose");

const UserShema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    //buradaki user ve admin dışındakileri kabul etmeyeceği anlamına geliyor.
    role: { type: String, default: "user", enum: ["user", "admin"] },
    avatar: {type : String}
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserShema);
module.exports = User;
