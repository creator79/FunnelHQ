// user.service.js
import db from './database.js';

const create = (data, callback) => {
    db.query(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [data.username, data.email, data.password],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        }
    );
};


const getUser = (callback) => {
    db.query(`SELECT * FROM users`, [], (err, results, fields) => {
        if (err) {
            return callback(err);
        }
        return callback(null, results);
    });
}

const updateUser = (data, callback) => {
    db.query(
        `UPDATE users SET username=?, email=?, password=? WHERE id=?`,
        [data.username, data.email, data.password, data.id],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        }
    );
}

const deleteUser = (data, callback) => {
    db.query(
        `DELETE FROM users WHERE id=?`,
        [data.id],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        }
    );
}

const getUserByEmail = (email, callback) => {
    db.query(
        `SELECT * FROM users WHERE email=?`,
        [email],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results[0]);
        }
    );
}

const findByUsername = (username, callback) => {
    db.query(
        `SELECT * FROM users WHERE username=?`,
        [username],
        (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        }
    );
}

export { create , getUser , updateUser , deleteUser , getUserByEmail , findByUsername};
