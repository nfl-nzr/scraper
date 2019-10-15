const cheerio = require('cheerio');

const parseFromSource = html => {
    const productDetails = { };
    const $ = cheerio.load(html);

    //Find the product name/title
    const title = $("#productTitle").text().trim();
    if (title) productDetails.name = title;

    //Search for the span tag that holds the price.
    const price = $('td.a-span12 > span');

    //Determine the price from the class name.
    const priceFromClass = price.map(function (){ 
        const cls = $(this).attr('class');
        if(cls && cls.includes('price') && !cls.includes('a-text-strike')) return this
    }).get();
    if (priceFromClass) {
        productDetails.price = $(priceFromClass).text();
        return productDetails
    }

    //If price is not found using the class name find price using id's
    const priceFromIds = price.map(function () {
        const ids = $(this).attr('id');
        if (ids === 'priceblock_dealprice') {
            return ids
        }
    }).get();

    if(priceFromIds) {
        productDetails.price = $(priceFromIds).text();
        return productDetails;
    }

   return false
};

module.exports = {
    parseFromSource
}