// controller-register.js
const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    formRegister(req, res) {
        res.render("register", {
            url: 'http://localhost:5050/',
        });
    },

    saveRegister(req, res) {
        const { username, email, pass: password } = req.body;
        if (username && email && password) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(
                    'INSERT INTO users (nama, email, password) VALUES (?, ?, SHA2(?, 512))',
                    [username, email, password],
                    (error) => {
                        if (error) throw error;
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Registrasi berhasil');
                        res.redirect('/login');
                    }
                );
                connection.release();
            });
        } else {
            res.redirect('/login');
        }
    }
};
