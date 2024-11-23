// controller-contact.js
const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getContact(req, res) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk_bibit;', (error, results) => {
                if (error) throw error;

                res.render('pupuk', {
                    url: 'http://localhost:5050/',
                    pupuk: results.length > 0 ? results : [] 
                });
            });
            connection.release();
        });
    },

    formContact(req, res) {
        res.render("addPupuk", {
            url: 'http://localhost:5050/',
        });
    },

    saveContact(req, res) {
        const { name, pupuk, umur } = req.body;
        if (name && pupuk && umur) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(
                    'INSERT INTO pupuk_bibit (name, pupuk, umur) VALUES (?, ?, ?);',
                    [name, pupuk, umur],
                    (error) => {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/pupuk');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },

    editContact(req, res) {
        const { id } = req.params;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk_bibit WHERE id = ?', [id], (error, results) => {
                if (error) throw error;
                res.render('editPupuk', {
                    url: 'http://localhost:5050/',
                    pupuk: results.length > 0 ? results[0] : null
                });
            });
            connection.release();
        });
    },

    updateContact(req, res) {
        const { id } = req.params;
        const { name, pupuk, umur } = req.body;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                'UPDATE pupuk_bibit SET name = ?, pupuk = ?, umur = ? WHERE id = ?',
                [name, umur, pupuk, id],
                (error) => {
                    if (error) throw error;
                    res.redirect('/pupuk');
                }
            );
            connection.release();
        });
    },

    deleteContact(req, res) {
        const { id } = req.params;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('DELETE FROM pupuk_bibit WHERE id = ?', [id], (error) => {
                if (error) throw error;
                res.redirect('/pupuk');
            });
            connection.release();
        });
    }
};
