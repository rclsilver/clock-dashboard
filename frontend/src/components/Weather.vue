<template>
  <p id="weather">
    <span v-if="currentSensorIndex >= 0">
      <span class="label">{{ sensors[currentSensorIndex].label }}</span>
      <span class="value">{{ sensors[currentSensorIndex].last }}</span>
    </span>
    <span v-else>-</span>
  </p>
</template>

<script>
  const axios = require('axios').default;
  const getSensors = () => axios.get('/api/weather/temperatures');

  export default {
    name: 'Weather',

    data() {
      return {
        tickerGetSensors: null,
        tickerChangeSensor: null,
        sensors: [],
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
    },

    destroyed() {
      if(this.tickerGetSensors) {
        clearInterval(this.tickerGetSensors);
      }

      if(this.tickerChangeSensor) {
        clearInterval(this.tickerChangeSensor);
      }
    }
  }
</script>

<style scoped>
  #weather {
    font-size: 2.5em;
    letter-spacing: 0.1em;
    padding: 20px 0 0;
  }

  .label:after {
    content: " : ";
  }

  .value:after {
    content: "°C";
  }
</style>
