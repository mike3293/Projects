<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3 v-if="enviroment == 'development'">version: {{version}}</h3>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      version: process.env.VUE_APP_VERSION,
      enviroment: process.env.NODE_ENV
    }
  }
}
</script>