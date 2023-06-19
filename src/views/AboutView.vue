<template>
  <div class="about">
    <h1>Mes commandes</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rep:true
  };
},
  created() {
    getSold();
  },
  methods: {
    getSold(){
      return true;
    },
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
