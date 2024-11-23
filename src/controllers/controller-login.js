// controller-login.js
const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    login(req, res) {
        res.render("login", {
            url: 'http://localhost:5050/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },

    loginAuth(req, res) {
        const { email, pass: password } = req.body;
        if (email && password) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(
                    'SELECT * FROM users WHERE email = ? AND password = SHA2(?,512)',
                    [email, password],
                    (error, results) => {
                        if (error) throw error;
                        if (results.length > 0) {
                            req.session.loggedin = true;
                            req.session.userid = results[0].id;
                            req.session.username = results[0].nama;
                            res.redirect('/');
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Akun tidak ditemukan');
                            res.redirect('/login');
                        }
                    }
                );
                connection.release();
            });
        } else {
            res.redirect('/login');
        }
    },

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) return console.error(err);
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    }
};
