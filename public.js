const express = require('express');
const router = express.Router();

/**
    * @swagger
    * /public:
    *   get:
    *     summary: Public API
    *     responses:
    *       200:
    *         description: Public API without authentication
    */
router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'This is public API, No authentication required!',
      });
});

module.exports = router;