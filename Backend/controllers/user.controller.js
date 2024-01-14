// user.controller.js
import { create, getUser, updateUser, deleteUser , getUserByEmail ,findByUsername } from "../utils/user.service.js";
import { genSaltSync, hashSync , compareSync } from "bcrypt";
import jwt  from "jsonwebtoken";

export const createUsers = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    create(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}

export const getUsers = (req, res) => {
    getUser((err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            data: results
        });
    });
}

export const updateUsers = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Failed to update user"
            });
        }
        return res.json({
            success: 1,
            message: "updated successfully"
        });
    });
}

export const deleteUsers = (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record not found"
            });
        }
        return res.json({
            success: 1,
            message: "user deleted successfully"
        });
    });
}


export const  login  = (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
        if (err) {
            console.log(err);
        }
        if (!results) {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
            results.password = undefined;
            const jsontoken = jwt.sign({ result: results }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });
            return res.json({
                success: 1,
                message: "login successfully",
                token: jsontoken
            });
        } else {
            return res.json({
                success: 0,
                data: "Invalid email or password"
            });
        }
    });
}



// export const register = (req, res) => {
//     const body = req.body;
//     const salt = genSaltSync(10);
//     body.password = hashSync(body.password, salt);
//     create(body, (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({
//                 success: 0,
//                 message: "Database connection error"
//             });
//         }
//         return res.status(200).json({
//             success: 1,
//             data: results
//         });
//     });

// }

export const register = (req, res) => {
    const body = req.body;
    console.log(body);


    // Check if the username is already present
    findByUsername(body.username, (usernameErr, usernameResult) => {
        if (usernameErr) {
            console.log(usernameErr);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }

        if (usernameResult.length > 0) {
            // Username already exists
            return res.status(400).json({
                success: 0,
                message: "Username already exists"
            });
        }

        // Check if the email is already present
        getUserByEmail(body.email, (emailErr, emailResult) => {
            if (emailErr) {
                console.log(emailErr);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            if (emailResult) {
                // Email already exists
                return res.status(400).json({
                    success: 0,
                    message: "Email already exists"
                });
            }
            
            // If username and email are unique, proceed with user registration
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);

            create(body, (registrationErr, results) => {
                if (registrationErr) {
                    console.log(registrationErr);
                    return res.status(500).json({
                        success: 0,
                        message: "Database Connection error",
                        error: registrationErr
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
        });
    });
};