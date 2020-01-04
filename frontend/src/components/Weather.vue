<template>
  <div id="weather">
    <p id="sensors">
      <span v-if="currentSensorIndex >= 0">
        <span class="label">{{ sensors[currentSensorIndex].label }}</span>
        <span class="value">{{ sensors[currentSensorIndex].last }}</span>
      </span>
      <span v-else>-</span>
    </p>
    <ul id="forecast">
      <li v-for="item in forecast" v-bind:key="item.dt">
        <p class="time">{{ item.dt | timestamp2hours }}</p>
        <p class="icon"><img v-bind:src="'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png'"/></p>
        <p class="temp">{{ item.main.temp.toFixed(1) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  const axios = require('axios').default;
  const moment = require('moment');
  const getSensors = () => axios.get('/api/sensors/temperatures');
  const getForecast = () => axios.get('/api/weather/forecast');

  export default {
    name: 'Weather',

    data() {
      return {
        tickerGetSensors: null,
        tickerChangeSensor: null,
        sensors: [],
        forecast: [],
        currentSensorIndex: -1
      };
    },

    created() {
      this.tickerGetSensors = setInterval(() => {
        getSensors().then(res => {
          if(!res.data.length) {
            this.currentSensorIndex = -1;
          } else if(this.currentSensorIndex < 0) {
            this.currentSensorIndex = 0;
          }
          this.sensors = res.data;
        });
      }, 1000 * 60 * 5);

      this.tickerGetForecast = setInterval(() => {
        getForecast().then(res => {
          this.forecast = res.data;
        });
      }, 1000 * 60 * 5);

      this.tickerChangeSensor = setInterval(() => {
        if(this.sensors.length) {
            this.currentSensorIndex++;

            if(this.currentSensorIndex == this.sensors.length) {
              this.currentSensorIndex = 0;
            }
        }
      }, 1000 * 5);

      getSensors().then(res => {
        if(!res.data.length) {
          this.currentSensorIndex = -1;
        } else if(this.currentSensorIndex < 0) {
          this.currentSensorIndex = 0;
        }
        this.sensors = res.data;
      });

      getForecast().then(res => {
        this.forecast = res.data;
      });
    },

    destroyed() {
      if(this.tickerGetSensors) {
        clearInterval(this.tickerGetSensors);
      }

      if(this.tickerChangeSensor) {
        clearInterval(this.tickerChangeSensor);
      }
    },

    filters: {
      timestamp2hours: (value) => {
        return moment.unix(value).format('HH');
      }
    }
  }
</script>

<style scoped>
  #sensors {
    font-size: 2.5em;
    letter-spacing: 0.1em;
    padding-bottom: 20px;
  }

  #sensors .label:after {
    content: " : ";
  }

  #sensors .value:after {
    content: "°C";
  }

  #forecast {
    font-size: 1.5em;
    display: inline;
    list-style: none;
    text-align: center;
    padding-inline-start: 0;
  }

  #forecast li {
    display: inline-block;
    padding-right: 1em;
    padding-left: 1em;
  }

  #forecast li:first-child {
    padding-left: 0;
  }

  #forecast li:last-child {
    padding-right: 0;
  }

  #forecast .time:after {
    content: "h";
  }

  #forecast .temp:after {
    content: "°C";
  }
</style>
