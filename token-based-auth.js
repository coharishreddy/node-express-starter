const express = require('express');
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = "R@ndomSecreT";

/**
    * @swagger
    * /token-based-auth:
    *   post:
    *     summary: Token based auth login
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *           example:
    *             username: admin
    *             password: admin
    *     responses:
    *       201:
    *         description: User Loggedin
    */
router.post("/", (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} is trying to login ..`);
  
    if (username === "admin" && password === "admin") {

        const tokenPayload = {
            name: username,
        };
        const accessToken = jsonwebtoken.sign(tokenPayload, JWT_SECRET);
        return res.status(201).json({
            status: 'success',
            message: 'User Logged In!',
            data: {
                accessToken,
            },
        });
    }
  
    return res
      .status(401)
      .json({ message: "The username and password your provided are invalid" });
});


module.exports = router;