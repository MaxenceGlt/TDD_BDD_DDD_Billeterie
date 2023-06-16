<template>
  <div className="w-full mt-10" class="about">
    <div className="flex justify-center text-3xl">
        <h1 className="text-2xl font-title place-self-center text-cyan-300 md:text-4xl lg:text-5xl xl:text-6xl">Billeterie des événements</h1>
    </div>
    <br>
    <div className="w-full grid grid-rows-1 grid-cols-5 gap-3" v-if="!evenementChose">
        <div className="hover:scale-105 transform transition duration-500" v-for="(item, index) in myjson">
            <div class="{{item.name}} grid border rounded-lg p-4">
                <span class="text-xl text-cyan-300 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">{{item.name}}</span>
                <div className='px-16'>
                    <hr className='mb-2'>
                </div> 
                <img class="rounded-xl" :src="lyonEsportImg">
                <br>
                <div class="grid grid-rows-2 grid-cols-1 md:grid md:grid-cols-1 md:grid-rows-1">
                    <span class="text-gray-300 text-xs md:text-lg lg:text-xl xl:text-2xl">Nombre de place restante : </span><span class="text-cyan-300 text-xs bold md:text-xl lg:text-2xl xl:text-3xl">{{ item.placeAvailable }}</span>
                </div>
                <br>
                <div class="grid grid-rows-2 grid-cols-1 md:grid md:grid-cols-1 md:grid-rows-1">
                    <span class="text-gray-300 text-xs md:text-lg lg:text-xl xl:text-2xl">Nombre de pass restant : </span><span class="text-cyan-300 text-xs bold md:text-xl lg:text-2xl xl:text-3xl">{{ item.placeAvailable }}</span>
                </div>
                <button className="button p-4 hover:bg-gray-400 bg-cyan-300 py-2 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" :value="item.name" @click="(e) => displayDetailBilleterie(e.target.value)">Acheter</button>
            </div>
        </div>
    </div>
    <div v-if="evenementChose">
        <div class="grid" v-if="!displayPanierToggle">
            <p class="text-sm font-texxt text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl">Vous allez reserver pour l'événement : </p>
            <h2 class="text-sm font-text2 text-gray-200 text-center md:text-xl lg:text-3xl xl:text-4xl">{{ data.name }}</h2>
            <br>
            <div class="grid grid-rows-1 grid-cols-6">
                <div class="col-start-2 col-end-5">
                    <span class="text-sm font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl">Prix des places : {{ data.prixUnit }}</span>
                    <form @submit="bought">
                        <div className="flex gap-2 items-center" v-for="(titulaire, index) in titulaires" :key="index">
                            <label class="text-xs font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="date">Date</label>
                            <select class="font-bold h-6  bg-gray-600 w-full shadow-2xl rounded-xl font-texxt text-sm placeholder-white text-white border border-blue-200 outline-0 md:text-sm lg:text-lg xl:text-xl" @change="dateChanged()" v-model="titulaire.date" required>
                                <option class="0" disabled value="">Jour</option>
                                <option   :value="data.dateDebutEvenement">{{ data.dateDebutEvenement }}</option>
                            </select>                 
                            <label class="text-xs font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="name">Nom</label>
                            <input className="font-bold h-6 p-2 bg-gray-600 w-full shadow-2xl rounded-xl font-texxt text-xl placeholder-white text-white border border-blue-200 outline-0 md:text-xl lg:text-xl xl:text-2xl" type="name" id="name" v-model="titulaire.name" required>
                            <label class="text-xs font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="prenom">Prénom</label>
                            <input className="font-bold h-6 p-2 bg-gray-600 w-full shadow-2xl rounded-xl font-texxt text-xl placeholder-white text-white border border-blue-200 outline-0 md:text-xl lg:text-xl xl:text-2xl" type="prenom" id="prenom" v-model="titulaire.prenom" required>
                            <button className="button p-4 hover:bg-gray-500 bg-gray-400 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="supprimerTitulaire(titulaire)">Supprimer</button>
                            <br>
                        </div>
                        <br>
                        <button className="button hover:bg-gray-400 bg-cyan-300 py-2 w-full text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="ajouterTitulaire()">Ajouter un titulaire</button>
                        <br>
                        <span class="text-sm font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl">Prix des PASS : {{ data.prixPass }}</span>
                        <br>
                        <div className="flex gap-2 items-center" v-for="(titulairePass, index) in titulairesPass" :key="index">
                            <label class="text-xs font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="name">Nom</label>
                            <input  className="font-bold h-6 p-2 bg-gray-600 w-full shadow-2xl rounded-xl font-texxt text-xl placeholder-white text-white border border-blue-200 outline-0 md:text-xl lg:text-xl xl:text-2xl" type="name" id="name" v-model="titulairePass.name" required>
                            <br>
                            <label class="text-xs font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="prenom">Prénom</label>
                            <input className="font-bold h-6 p-2 bg-gray-600 w-full shadow-2xl rounded-xl font-texxt text-xl placeholder-white text-white border border-blue-200 outline-0 md:text-xl lg:text-xl xl:text-2xl" type="prenom" id="prenom" v-model="titulairePass.prenom" required>
                            <br>
                            <button className="button p-4 hover:bg-gray-500 bg-gray-400 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl"  @click="supprimerTitulairePass(titulairePass)">Supprimer</button>
                        </div>
                        <br>
                        <button className="button hover:bg-gray-400 bg-cyan-300 py-2 w-full text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="ajouterTitulairePass()">Ajouter un titulaire</button>
                        <br>
                        <div class="grid grid-rows-2 grid-cols-1 md:grid md:grid-cols-1 md:grid-rows-1">
                            <spans class="text-gray-300 font-text2 text-xs md:text-lg lg:text-xl xl:text-2xl">Total : </spans><span class="text-cyan-300 font-text2 text-xs bold md:text-xl lg:text-2xl xl:text-3xl">{{ this.prixTotal }} $</span>
                        </div>
                        <br>
                        <button class="button hover:bg-gray-400 bg-cyan-500 py-2 w-4/12 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="displayPanier()">Valider</button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
    <div v-if="displayPanierToggle">
        <label class="grid justify-center text-sm font-texxt text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="name">Votre panier</label>
        <br>
        <label v-if="!titulaires.length==0" class="grid ml-64 justify-start text-sm font-texxt text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="name">Vos billet(s)</label>
        <div class="grid grid-cols-5 justify-center w-full">
            <div className="flex gap-2 items-center col-start-2 col-end-5">
                <table className="min-w-full border border-gray-300 bg-gray-500 " v-for="(titulaire, index) in titulaires" :key="index">
                    <thead>
                        <tr class="border-b border-cyan-300 rounded-xl">
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Date</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Nom</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Prénom</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ titulaire.date }}</td>
                            <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ titulaire.name }}</td>
                            <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ titulaire.prenom }}</td>
                            <div className="flex justify-center bg-gray-500">
                                <button className="button hover:bg-gray-400 bg-cyan-300 py-2 w-full h-20 place-content-center text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl"  @click="supprimerTitulaire(titulaire)">Supprimer</button>
                            </div>
                        </tr>
                    </tbody>
                </table>  
            </div>
        </div>
        <br>
        <label v-if="!titulairesPass.length==0" class="grid ml-64 justify-start text-sm font-texxt text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="name">Vos pass</label>
        <div class="grid grid-cols-5 justify-center w-full">
            <div className="flex gap-2 items-center col-start-2 col-end-5">
                <table className="min-w-full bg-gray-400 border border-gray-300" v-for="(titulairePass, index) in titulairesPass" :key="index">
                    <thead>
                        <tr class="border-b border-cyan-300 rounded-xl">
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Nom</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Prénom</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ titulairePass.name }}</td>
                            <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ titulairePass.prenom }}</td>
                            <div className="flex justify-center bg-gray-500">
                                <button className="button hover:bg-gray-400 bg-cyan-300 py-2 w-full h-20 place-content-center text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl"  @click="supprimerTitulairePass(titulairePass)">Supprimer</button>
                            </div> 
                        </tr>
                    </tbody>
                </table>
               
            </div>
        </div>
        <br>
        <div class="grid grid-rows-1 grid-cols-4">
                <div class="col-start-2 col-end-4"><spans class="text-gray-300 font-text2 text-2xl md:text-2xl lg:text-3xl xl:text-5xl">Total : </spans><span class="text-cyan-300 font-text2 text-xl bold md:text-3xl lg:text-4xl xl:text-5xl">{{ this.prixTotal }} $</span></div>
        </div>
    </div> 
</div>
</template>

<script>
import axios from 'axios';
import lyonEsportImg from "../assets/LyonEsport.jpeg"
import json from "../assets/billeterie.json"

export default {
  data() {
    return {
      evenementInformation: [],
      evenementChose: false,
      displayPanierToggle: false,
      lyonEsportImg: lyonEsportImg,  
      myjson: json.data,
      data:"",
      titulaires: [],
      titulairesPass: [],
      prixTotal: 0
    };
  },
  created() {
    this.getEvenementInformation();
  },
  methods: {
    getEvenementInformation(){
        //Créer un appel api pour récuperer les données des evenements (événements globaux)
    },
    displayDetailBilleterie(value){
        this.evenementChose = true;
        this.data = this.myjson.find(e => e.name===value);
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
        if((titulaire.date !== '') && (titulaire.name !== '') && (titulaire.prenom !== '')){
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }else if((titulaire.date !== '') && ((titulaire.name !== '') || (titulaire.prenom !== '')) ){
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }else if((titulaire.date !== '') && ((titulaire.name == '') || (titulaire.prenom == '')) ){
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }
        console.log(titulaire)
        this.titulaires = this.titulaires.filter(item => item.id !== titulaire.id);
    },
    ajouterTitulairePass() {
      const nouvelId = this.titulairesPass.length + 1;
      this.titulairesPass.push({ id: nouvelId, date: '', name: '', prenom: '' });
      this.prixTotal = this.prixTotal + this.data.prixPass;
    },
    supprimerTitulairePass(titulairePass) {
        this.titulairesPass = this.titulairesPass.filter(item => item.id !== titulairePass.id);
        this.prixTotal = this.prixTotal - this.data.prixPass;
    },
    displayPanier(){
        console.log(this.titulaires)
        this.displayPanierToggle = true;
    }
}
};
</script>