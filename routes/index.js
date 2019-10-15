const express = require('express');
const router = express.Router();

const scraper = require('../controllers/priceFetcher').scraper

router.post('/scrape', async (req, res) => {
  const {url} = req.body;

  const [err, data] = await scraper(url)

  if(err) return res.status(err.code || 500).json({message: err.message || 'Server error encountered.'});
  if(!data) return res.status(404).json({data: 'Product not found!'});
  if (data) return res.status(200).json(data);

})

module.exports = router;
