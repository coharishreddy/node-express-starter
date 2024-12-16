const express = require('express');
const router = express.Router();

/**
    * @swagger
    * /health:
    *   get:
    *     summary: Check the health
    *     responses:
    *       200:
    *         description: Check server health
    */
router.get('/', (req, res) => {
    return res
      .status(200)
      .json({ status: "success" });
});

module.exports = router;