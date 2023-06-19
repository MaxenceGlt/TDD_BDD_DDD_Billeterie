<template>
  <main>
    <div class="grid">
      <button className="button place-self-end hover:bg-gray-400 bg-cyan-300 py-2 w-2/12 h-16 place-content-center text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative md:py-2 md:text-sm lg:text-base xl:text-xl"  @click="disconnect()">Déconnexion</button>
    </div>    
    <div class="grid grid-cols-1 mt-6">
      <h1 class="text-2xl font-title place-self-center text-cyan-300 md:text-4xl lg:text-5xl xl:text-6xl">BILLETERIE E-SPORT</h1>
      <p class="text-2xl place-self-center font-spegiel-bold mb-4 text-gray-300 md:text-2xl lg:text-3xl xl:text-4xl">Bienvenue dans le service de billetterie d'événements e-Sport</p>
      <div class="w-3/5 h-full place-self-center transition hover:scale-105">
        <img class="rounded-2xl" :src="leagueOfLegendsBanner">
      </div>
      <div class="w-4/5 place-self-center">
        <button class="button w-full hover:bg-gray-400 bg-cyan-300 py-2 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-2xl lg:text-3xl xl:text-4xl" @click="redirectToBilleterie()">Accéder à la billetterie</button>
      </div>
      <br>
      <div v-if="localStorageStatus" class="w-4/5 place-self-center">
        <button class="button w-full hover:bg-gray-400 bg-cyan-300 py-2 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-2xl lg:text-3xl xl:text-4xl" @click="redirectToAdminPage()">Admin Page</button>
      </div>
    </div>


    <TheWelcome />
  </main>
</template>

<script>
import TheWelcome from '../components/TheWelcome.vue'
import leagueOfLegendsBanner from "../assets/leagueOfLegendsBanner.jpeg"

export default {
  data() {
    return {     
      leagueOfLegendsBanner: leagueOfLegendsBanner,
      localStorageStatus: ''  
    };
  },
methods: {
    redirectToBilleterie() {
      this.$router.push('/billeterie');
    },
    redirectToAdminPage() {
      this.$router.push('/admin');
    },
    disconnect(){
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('loggedIn');
      this.$router.push('/');
    }
  },
  created() {
    this.localStorageStatus = sessionStorage.getItem('isAdmin');
    console.log(this.localStorageStatus)
  }
}
</script>