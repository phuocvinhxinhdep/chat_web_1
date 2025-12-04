const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        pic: { type: String, require: true, default: "https://icon-library.com/images/22215-dog.ico.ico" },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;