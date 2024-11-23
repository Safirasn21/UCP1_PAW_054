const express = require("express");
const router = express.Router();
const db = require("../../configs/database");


router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err || results.length === 0) {
            res.send("User not found");
        } else {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                req.session.userId = user.id;
                res.redirect("/dashboard");
            } else {
                res.send("Incorrect password");
            }
        }
    });
});

module.exports = router;
