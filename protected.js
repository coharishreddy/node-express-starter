const express = require('express');
const router = express.Router();
const auth = require('./authenticate');

/**
    * @swagger
    * /protected:
    *   get:
    *     summary: Protected API
    *     responses:
    *       200:
    *         description: Protected API with token
    *     security:
    *       - bearerAuth: []
    */
router.get("/", auth, (req, res) => {
    return res
        .status(200)
        .json({ message: "This is protected API." });
});

module.exports = router;
