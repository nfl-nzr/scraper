const axios = require('axios');

const getPageSource = async (url) => {
        let axiosErr;
        const html = await axios.get(url).catch(err => {err = axiosErr});
        if(axiosErr) return [axiosErr, null];
        return [null, html.data];
};

module.exports = {
    getPageSource
}