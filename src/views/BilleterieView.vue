<template>
  <div className="w-full" class="about">
      <div className="flex justify-center text-3xl">
        <h1 className="text-red-800 mb-4 ">Billeterie des événements</h1>
      </div>
    <div className="w-full flex gap-3" v-if="!evenementChose">
        <div className="hover:scale-105 transform transition duration-500" v-for="(item, index) in myjson">
            <div class="{{item.name}}">
                <img :src="lyonEsport">
                <span>{{item.name}}</span>
                <br>
                <span>Nombre de place restante : {{ item.placeAvailable }}</span>
                <br>
                <span>Nombre de pass restant : {{ item.placeAvailable }}</span>
                <button className="button hover:bg-slate-300 bg-slate-400 py-2 w-full text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" :value="item.name" @click="(e) => displayPayement(e.target.value)">Acheter</button>
            </div>
        </div>
    </div>
    <div v-if="evenementChose">
        <p>Vous allez reserver pour l'événement : </p>
        <span>{{ data.name }}</span>
        <br>
        <span>Prix des places : {{ data.prixUnit }}</span>
        <form @submit="bought">
            <div className="flex gap-2 items-center" v-for="(titulaire, index) in titulaires" :key="index">
                <label for="date">Choisissez la date</label>
                <select @change="dateChanged()" v-model="titulaire.date" required>
                    <option disabled value="">Jour</option>
                    <option   :value="data.dateDebutEvenement">{{ data.dateDebutEvenement }}</option>
                </select>                 
                <label for="name">Nom du titulaire:</label>
                <input className="text-gray-300 rounded-xl bg-slate-600" type="name" id="name" v-model="titulaire.name" required>
                <label for="prenom">Prenom du titulaire:</label>
                <input className="rounded-xl text-gray-300 bg-slate-600" type="prenom" id="prenom" v-model="titulaire.prenom" required>
                <button className="button bg-slate-400 py-2 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="supprimerTitulaire(titulaire)">Supprimer</button>
            </div>
            <br>
            <button className="button bg-slate-400 py-2 w-full text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="ajouterTitulaire()">Ajouter un titulaire</button>
            <br>
            <span>Prix des PASS : {{ data.prixPass }}</span>
            <br>
            <div v-for="(titulairePass, index) in titulairesPass" :key="index">
                <label for="name">Nom du titulaire:</label>
                <input className="text-blue-700" type="name" id="name" v-model="titulairePass.name" required>
                <br>
                <label for="prenom">Prenom du titulaire:</label>
                <input type="prenom" id="prenom" v-model="titulairePass.prenom" required>
                <br>
                <button className="button bg-slate-400 py-2 w-full text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="supprimerTitulairePass(titulairePass.id)">Supprimer</button>
            </div>
            <br>
            <button className="button bg-slate-400 py-2 w-full text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="ajouterTitulairePass()">Ajouter un titulaire</button>
            <br>
            <button type="submit">Valider</button>
    </form>
    <span>{{ this.prixTotal }}</span>
    </div>
    
    
</div>
</template>

<script>
import axios from 'axios';
import lyonEsport from "../assets/LyonEsport.jpeg"
import json from "../assets/billeterie.json"

export default {
  data() {
    return {
      evenementInformation: [],
      evenementChose: false,
      lyonEsport: lyonEsport,  
      myjson: json.data,
      data:"",
      titulaires: [],
      titulairesPass: [],
      prixTotal: 0
    };
  },
  created() {
    this.test();
  },
  methods: {
    test(){
        //Créer un appel api pour récuperer les données des evenements (événements globaux)
        console.log(this.myjson)
    },
    displayPayement(value){
        this.evenementChose = true;
        console.log(value)
        console.log(this.myjson)
        this.data = this.myjson.find(e => e.name===value);
        console.log(this.data);
        //Appeler a nouveau l'API en passant dans la requete http le nom de l'evenement pour recevoir les bonnes informations

    },
    mounted() {
        axios.get($apiURL)
        .then(response => {
            this.evenementInformation = response.data;
        })
        .catch(error => {
            console.error(error);
        });
    },
    bought() {
      //Récupération des deux lists Titulaires et TitulairePass
    },
    dateChanged(){
        //Suivant le jour selectionner -> faire apparaitre le bon prix
        this.prixTotal = this.prixTotal + this.data.prixUnit;
    },
    ajouterTitulaire() {
      const nouvelId = this.titulaires.length + 1;
      this.titulaires.push({ id: nouvelId, date: '', name: '', prenom: '' });
    },
    supprimerTitulaire(titulaire) {
        console.log(titulaire.date)
        console.log(titulaire.name)
        console.log(titulaire.prenom)
        if((titulaire.date !== '') && (titulaire.name !== '') && (titulaire.prenom !== '')){
            console.log("im in 1STT")
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }else if((titulaire.date !== "") && ((titulaire.name !== "") || (titulaire.prenom !== "")) ){
            console.log("im in")
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }else if((titulaire.date !== "") && ((titulaire.name == "") || (titulaire.prenom == "")) ){
            console.log("im in")
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }
        this.titulaires = this.titulaires.filter(titulaire => titulaire.id !== titulaire.id);
    },
    ajouterTitulairePass() {
      const nouvelId = this.titulaires.length + 1;
      this.titulairesPass.push({ id: nouvelId, date: '', name: '', prenom: '' });
      this.prixTotal = this.prixTotal + this.data.prixPass;
    },
    supprimerTitulairePass(id) {
        this.titulairesPass = this.titulaires.filter(titulaire => titulaire.id !== id);
        this.prixTotal = this.prixTotal - this.data.prixPass;
    }
}
};
</script>