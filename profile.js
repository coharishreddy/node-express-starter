const express = require('express');
const router = express.Router();
const auth = require('../authenticate');

/**
    * @swagger
    * /profile:
    *   get:
    *     summary: Get the user profile
    *     responses:
    *       200:
    *         description: User Profile
    *     components:
    *        securitySchemes:
    *           bearerAuth: # arbitrary name for the security scheme
    *           type: http
    *           scheme: bearer
    *           bearerFormat: JWT # optional, arbitrary value for documentation purposes
    *     security:
    *       - bearerAuth: []
    */
router.get('/', auth, (req, res) => {
    return res.status(200).json({
        status: 'success',
        data: {
          user: {
              name: req.user.name,
          },
        },
      });
});

module.exports = router;