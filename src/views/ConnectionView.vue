<template>
    <div>
      <h1>Page de connexion</h1>
      <form @submit="login">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" required>
        <br>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required>
        <br>
        <button type="submit">Se connecter</button>
      </form>
      <div v-if="error" style="color: red;">{{ error }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
      };
    },
    methods: {
    login(event) {
      event.preventDefault();
      // Effectuez la requête POST vers le serveur
      /*axios.post('http://localhost:8080/login', {
        username: this.username,
        password: this.password,
      })
      .then(response => {
        // Connexion réussie
        this.error = '';
        this.$router.push('/billeterie'); // Redirigez vers la page de billeterie
      })
      .catch(error => {
        // Erreur de connexion
        this.error = 'Nom d\'utilisateur ou mot de passe incorrect.';
      });*/
      console.log(event)
      console.log(this.username);
      if(this.username=="admin" && this.password == "admin"){
          console.log("heyy")
         this.$router.push('/billeterie'); // Redirigez vers la page de billeterie
      }
    },
    }
  };
  </script>
  