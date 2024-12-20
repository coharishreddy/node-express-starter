const express = require('express');
const router = express.Router();

/**
    * @swagger
    * /basic-auth:
    *   post:
    *     summary: Basic auth login
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

module.exports = router;