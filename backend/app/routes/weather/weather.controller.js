const config = require('config').get('weather');
const axios = require('axios');

function getForecast() {
    return new Promise((resolve, reject) => {
        let city = config.get('city');
        let country = config.get('country');
        let units = config.get('units');
        let lang = config.get('lang');
        let apikey = config.get('api-key');
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${units}&appid=${apikey}&lang=${lang}`;

        axios.get(url).then(response => {
            resolve(response.data.list);
        }).catch(reject);
    });
}

module.exports = (router) => {
    router.get('/weather/forecast',
        (req, res) => {
            getForecast().then(data => {
                let currentTs = Math.round((new Date()).getTime() / 1000);
                let startTs = currentTs - (currentTs % 86400);
                let endTs = startTs + (86400 * 2);
                let count = config.get('count');

                res.send(data.filter(item => item.dt >= startTs && item.dt < endTs).slice(0, count));
            }).catch(error => {
                res.status(500).send(error);
            });
        }
    );
};
