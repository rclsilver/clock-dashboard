const config = require('config');
const ignored_sensors = config.get('ignored_sensors', []);
const Influx = require('influx');
const influx = new Influx.InfluxDB(
    config.get('influxdb')
);

module.exports = (router) => {
    router.get('/weather/temperatures',
        (req, res) => {
            influx.query('SELECT LAST(value) FROM temperature GROUP BY label').then(result => {
                res.json(result.filter(sensor => !ignored_sensors.includes(sensor.label)));
            }).catch(err => {
                res.status(500).send(err.stack);
            });
        },
    );
};
