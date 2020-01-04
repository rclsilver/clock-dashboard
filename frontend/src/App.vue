<template>
  <div id="app">
    <Clock></Clock>
    <Weather></Weather>
  </div>
</template>

<script>
  import Clock from './components/Clock.vue'
  import Weather from './components/Weather.vue'

  export default {
    name: 'app',
    components: {
      Clock,
      Weather
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    width: 854px;
    height: 480px;
    overflow: hidden;
  }

  body {
    background: #000000;
  }

  p {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    font-weight: bold;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    color: rgb(0, 0, 255);
  }
</style>
