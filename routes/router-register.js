const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../configs/database");


router.post("/register", async (req, res) => {
    const { nama, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
    db.query(query, [nama, email, hashedPassword], (err, result) => {
        if (err) {
            res.send("Error registering user");
        } else {
            res.redirect("/login");
        }
    });
});

module.exports = router;
