<template>
  <div id="clock">
    <p class="date">{{ date }}</p>
    <p class="special" v-if="special"><span class="red">❤️</span> {{ special }} ans <span class="red">❤️</span></p>
    <p class="time">{{ hours }}:{{ minutes }}</p>
  </div>
</template>

<script>
  function zeroPadding(number) {
    if(number < 10) {
      return '0' + number.toString();
    }
    return number.toString();
  }

  const getCurrentDate = () => new Date();
  const getMinutes = () => zeroPadding(getCurrentDate().getMinutes());
  const getHours = () => zeroPadding(getCurrentDate().getHours());
  const getDate = () => getCurrentDate().toLocaleString('fr-fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  export default {
    name: 'Clock',
    data() {
      return {
        ticker: null,
        date: getDate(),
        hours: getHours(),
        minutes: getMinutes(),
        special: false
      };
    },

    created() {
      this.ticker = setInterval(() => {
        this.date = getDate();
        this.hours = getHours();
        this.minutes = getMinutes();

        if(getCurrentDate().getDate() == 6 && getCurrentDate().getMonth() == 0) {
          this.special = getCurrentDate().getFullYear() - 2018;
        } else {
          this.special = false;
        }
      }, 1000);
    },

    destroyed() {
      if(this.ticker) {
        clearInterval(this.ticker);
      }
    }
  }
</script>

<style scoped>
  .time {
    letter-spacing: 0.05em;
    font-size: 10em;
    padding: 5px 0;
  }

  .date {
    font-size: 2.5em;
    letter-spacing: 0.1em;
    padding-bottom: .6em;
  }

  .red {
    color: red;
  }

  .special {
    font-size: 3em;
  }
</style>
