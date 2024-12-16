const express = require('express');
const router = express.Router();
const auth = require('./authenticate');
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = "R@ndomSecreT";

/**
    * @swagger
    * /health:
    *   get:
    *     summary: Check the health
    *     responses:
    *       200:
    *         description: Check server health
    */
router.get('/health', (req, res) => {
    return res
      .status(200)
      .json({ status: "success" });
});

router.post("/basic-auth", (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} is trying to login ..`);
  
    if (username === "admin" && password === "admin") {
      return res.json({
            status: 200,
            message: 'User Logged In!'
            // token: jsonwebtoken.sign({ user: "admin" }, JWT_SECRET),
      });
    }
  
    return res
      .status(401)
      .json({ message: "The username and password you provided are invalid" });
});

router.post("/token-based-auth", (req, res) => {
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

router.get('/profile', auth, (req, res) => {
    return res.status(200).json({
        status: 'success',
        data: {
          user: {
              name: req.user.name,
          },
        },
      });
});

router.get('/public', (req, res) => {
    return res.status(200).json({
        message: 'This is public API, No authentication required!',
      });
});

router.get("/protected", auth, (req, res) => {
    return res
        .status(200)
        .json({ message: "This is protected API." });
});

module.exports = router;