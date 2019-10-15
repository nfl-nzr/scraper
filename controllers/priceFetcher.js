const uriValidator = require('../utils/validators').uriValidator
const pageSource = require('../helpers/api').getPageSource;
const parser = require('../helpers/parser').parsePriceFromSource;

//Product url needs to be an the linkt to an amazon product.
const scraper = async productUrl => {

    const [validationErr, validUrl] = await uriValidator(productUrl).catch(err => [err, false])
    if(validationErr || !validUrl ) return [{code: 400, message: 'Url is not an amazon product url'}]

    const [apiErr, html] = await pageSource(productUrl);
    if(apiErr) return [{status: 502, data: "Could not fetch page."}, null];

    const parsedPrice = parser(html);
    if(parsedPrice) return [null, parsedPrice]

    return [null, null]
};

module.exports = {
    scraper
}