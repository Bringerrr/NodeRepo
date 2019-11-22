const express = require('express');
const router = express.Router();
const validate = require('../../helpers/validateForm');

router.post('/', (req, res) => {
  return res.json(validate(req.body));
});

module.exports = router;
