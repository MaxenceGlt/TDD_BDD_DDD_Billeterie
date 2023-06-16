<template>
<div class="flex items-center justify-center h-screen">
    <div class="grid grid-raws-2 rounded-2xl bg-gray-500 place-content-center w-10/12">
      <h1 class="text-3xl font-title place-self-center text-cyan-300">Connexion</h1>
      <form class="m-10" @submit="login">
        <div class="flex-raws p-2">
          <label class="text-sm font-title text-cyan-300" for="username">Email</label>
          <input class="font-bold h-10 w-full shadow-2xl rounded-xl font-texxt text-xl placeholder-white bg-transparent text-white border border-blue-200 outline-0 md:text-xl lg:text-xl xl:text-2xl" type="text" id="username" v-model="username" required>
        </div>
        <br>
        <div class="flex-raws p-2">
          <label class="text-sm font-title text-cyan-300" for="password">Mot de passe:</label>
          <input class="font-bold h-10 w-full shadow-2xl rounded-xl font-texxt text-xl placeholder-white bg-transparent text-white border border-blue-200 outline-0 md:text-xl lg:text-xl xl:text-2xl" type="password" id="password" v-model="password" required>
        </div>
        <br>
        <div class="flex justify-center">
          <button class="button p-4 hover:bg-gray-400 bg-cyan-300 py-2 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" type="submit">Se connecter</button>
        </div>
      </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      
      // Vérification des informations de connexion
      axios.post('/login', { username: this.username, password: this.password })
        .then(response => {
          // Succès de la vérification
          const data = response.data;
          if (data.success) {
            // Stockage de la variable de session
            sessionStorage.setItem('loggedIn', true);
            
            // Redirection vers une autre page
            this.$router.push('/dashboard');
          } else {
            // Affichage du message d'erreur
            this.error = data.message;
          }
        })
        .catch(error => {
          // Erreur lors de la requête
          this.error = 'Une erreur s\'est produite lors de la connexion.';
          console.error(error);
        });
        //if(this.username=='admin' && this.password=='admin'){
          //this.$router.push('/home');
        //}
    }
  }
};
</script>

<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
