// server.js
const express = require("express");
const basicAuth = require("express-basic-auth");

const app = express();

app.use(express.json())

app.use(
    basicAuth({
        users: { username: "admin"},
        challenge: true,
        unauthorizedResponse:
            "Unauthorized access. Please provide valid credentials",
    })
);

app.post("/login", (req, res) => {
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

// Protected Route
app.get('/profile', (req, res) => {
    console.log(req, res);
    return res.status(200).json({
        status: 'success',
      });
});


app.listen(3001, () => {
    console.log("API running on localhost:3001");
});