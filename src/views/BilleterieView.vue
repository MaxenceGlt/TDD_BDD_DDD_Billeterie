<template>
    <div class="grid">
        <button className="button place-self-end hover:bg-gray-400 bg-cyan-300 py-2 w-2/12 h-16 place-content-center text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative md:py-2 md:text-sm lg:text-base xl:text-xl"  @click="disconnect()">Déconnexion</button>
    </div>  
    <div className="w-full mt-10" class="about">
    <div className="flex justify-center text-3xl">
        <h1 className="text-2xl font-title place-self-center text-cyan-300 md:text-4xl lg:text-5xl xl:text-6xl">Billeterie des événements</h1>
    </div>
    <br>
    <div className="w-full grid grid-rows-1 grid-cols-5 gap-3" v-if="!evenementChose">
        <div className="hover:scale-105 transform transition duration-500" v-for="(item, index) in this.evenementInformation">
            <div class="{{item.name}} grid border rounded-lg p-4">
                <span class="text-xl text-cyan-300 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">{{item.locationEvent}}</span>
                <div className='px-16'>
                    <hr className='mb-2'>
                </div> 
                <img class="rounded-xl" :src="lyonEsportImg">
                <br>
                <span class="text-lg text-cyan-300 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-lg xl:text-xl">{{item.nameEvent}}</span>
                <br>
                <div class="grid grid-rows-2 grid-cols-1 md:grid md:grid-cols-2 md:grid-rows-1">
                    <span class="text-gray-300 text-xs md:text-xs lg:text-xl xl:text-2xl">Du </span><span class="text-cyan-300 text-xs bold md:text-sm lg:text-2xl xl:text-xl">{{ item.startDate }}</span>
                    <span class="text-gray-300 text-xs md:text-xs lg:text-xl xl:text-2xl">au </span><span class="text-cyan-300 text-xs bold md:text-sm lg:text-2xl xl:text-xl">{{ item.endDate }}</span>

                </div>
                <br>
                <div class="grid grid-rows-2 grid-cols-1 md:grid md:grid-cols-2 md:grid-rows-1">
                    <span class="text-gray-300 text-xs md:text-xs lg:text-xl xl:text-xl">A partir de</span><span class="text-cyan-300 text-xs bold md:text-xs lg:text-2xl xl:text-xl">{{ item.minimumPrice }} $</span>
                </div>
                <br>
                <div class="grid grid-rows-2 grid-cols-1 md:grid md:grid-cols-2 md:grid-rows-1">
                    <span class="bold text-gray-300 text-xs md:text-xs lg:text-sm xl:text-sm">Prix du multi Pass</span><span class="text-cyan-300 text-xs bold md:text-xs lg:text-2xl xl:text-xl">{{ item.multiPassPrice }} $</span>
                </div>
                <button className="button p-4 hover:bg-gray-400 bg-cyan-300 py-2 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" :value="item.idEvent" @click="(e) => displayDetailBilleterie(e.target.value)">Acheter</button>
            </div>
        </div>
    </div>
    <div v-if="evenementChose">
        <div class="grid" v-if="!displayPanierToggle">
            <p class="text-sm font-texxt text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl">Vous allez reserver pour l'événement : </p>
            <h2 class="text-sm font-text2 text-gray-200 text-center md:text-xl lg:text-3xl xl:text-4xl">{{ this.eventInformation.name }}</h2>
            <br>
            <div class="grid grid-rows-1 grid-cols-6">
                <div class="col-start-2 col-end-5">
                    <span class="text-sm font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl">Prix des places :</span>
                    <table className="min-w-full border border-gray-300 bg-gray-500 ">
                        <thead>
                            <tr class="border-b border-cyan-300 rounded-xl">
                                <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Date</th>
                                <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Prix</th>
                                <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Place(s) restantes(s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(billets, index) in this.eventInformation.datesEvent" :key="index">
                                <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ billets.date }}</td>
                                <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ billets.price }}</td>
                                <td className="text-xl p-2 border-r border-cyan-300 bg-gray-500 place-self-center font-spegiel-bold uppercase md:text-xl lg:text-xl xl:text-2xl text-center">{{ billets.placeMax }}</td>
                            </tr>
                        </tbody>
                    </table>  
                    <form @submit="bought">
                        <div className="flex gap-2 items-center" v-for="(titulaire, index) in titulaires" :key="index">
                            <label class="text-xs font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl" for="date">Date</label>
                            <select class="font-bold h-6  bg-gray-600 w-full shadow-2xl rounded-xl font-texxt text-sm placeholder-white text-white border border-blue-200 outline-0 md:text-sm lg:text-lg xl:text-xl" @change="(e)=>handleDateChanged(e)" v-model="titulaire.date" required>
                                <option class="0" disabled value="">Jour</option>
                                <option v-for="date in this.eventInformation.datesEvent" :key="date.id" :value="date.date">{{date.date}}</option>
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
                        <span class="text-sm font-text2 text-gray-200 text-center md:text-lg lg:text-xl xl:text-2xl">Prix des PASS : {{ }}</span>
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
                <table className="min-w-full border border-gray-300 bg-gray-500 " >
                    <thead>
                        <tr class="border-b border-cyan-300 rounded-xl">
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Date</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Nom</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Prénom</th>
                            <th className="text-xl p-2 text-cyan-300 bg-gray-700 place-self-center font-spegiel-bold uppercase md:text-2xl lg:text-3xl xl:text-4xl">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(titulaire, index) in titulaires" :key="index">
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
        <div class="grid grid-cols-8 justify-center w-full">
            <div className="flex gap-2 items-center col-start-3 col-end-7">
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
        <button class="button hover:bg-gray-400 bg-cyan-500 py-2 w-4/12 text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative block md:py-2 md:text-sm lg:text-base xl:text-xl" @click="validatePanier()">Valider</button>
    </div> 
</div>
</template>

<script>
import axios from 'axios';
import lyonEsportImg from "../assets/LyonEsport.jpeg"

export default {
  data() {
    return {
      evenementInformation: [],
      eventInformation: [],
      eventIdSelected:0,
      evenementChose: false,
      displayPanierToggle: false,
      lyonEsportImg: lyonEsportImg,  
      titulaires: [],
      titulairesPass: [],
      prixTotal: 0,
      previousPrice:0,
      eventDetail:[]
    };
  },
  created() {
    this.getEvenementInformation();
  },
  methods: {
    async getEvenementInformation(){
        //Créer un appel api pour récuperer les données des evenements (événements globaux)
        await axios.get('http://localhost:8080/api/home/getEvents')
        .then(response => {
        // Succès de la vérification
        this.evenementInformation = response.data;
        if (response.status===200) {
            console.log(this.evenementInformation)

        } else {
            // Affichage du message d'erreur
            this.error = data.message;
        }
        })
        .catch(error => {
        // Erreur lors de la requête
        this.error = 'Une erreur s\'est produite lors de la récupération des evenements.';
        console.error(error);
        }); 
    },
    async displayDetailBilleterie(value){
        this.evenementChose = true;
        this.eventIdSelected = value;
        //Récupération de l'événement séléctionné
        await axios.get('http://localhost:8080/api/event/getDetails', {params:{id: value}})
        .then(response => {
          // Succès de la vérification
          this.eventInformation = response.data;
        })
        .catch(error => {
          // Erreur lors de la requête
          this.error = 'Une erreur s\'est produite lors de la récupération de l\'événement.';
          console.error(error);
        });

    },
    handleDateChanged(e){
        const price = this.eventInformation.datesEvent.filter(item=> item.date === e.target.value)[0].price;
        console.log(this.titulaires)

        //Suivant le jour selectionner -> faire apparaitre le bon prix
        this.prixTotal = this.prixTotal + price;
        this.prixTotal = this.prixTotal - this.previousPrice;
        this.previousPrice = price;
    },
    ajouterTitulaire() {
      const nouvelId = this.titulaires.length + 1;
      this.titulaires.push({ id: nouvelId, date: '', name: '', prenom: '', isMultipass: false });
      this.previousPrice = 0;
    },
    supprimerTitulaire(titulaire) {
        if((titulaire.date !== '') && (titulaire.name !== '') && (titulaire.prenom !== '')){
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }else if((titulaire.date !== '') && ((titulaire.name !== '') || (titulaire.prenom !== '')) ){
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }else if((titulaire.date !== '') && ((titulaire.name == '') || (titulaire.prenom == '')) ){
            this.prixTotal = this.prixTotal - this.data.prixUnit;
        }
        this.titulaires = this.titulaires.filter(item => item.id !== titulaire.id);
    },
    ajouterTitulairePass() {
      const nouvelId = this.titulairesPass.length + 1;
      this.titulairesPass.push({ id: nouvelId, date: '', name: '', prenom: '', isMultipass: true});
      this.prixTotal = this.prixTotal + this.eventInformation.multiPassPrice;
    },
    supprimerTitulairePass(titulairePass) {
        this.titulairesPass = this.titulairesPass.filter(item => item.id !== titulairePass.id);
        this.prixTotal = this.prixTotal - this.eventInformation.multiPassPrice;
    },
    displayPanier(){
        this.displayPanierToggle = true;
        console.log(listOfBillet)
    },
    async validatePanier(){
        const listOfBillet = [...this.titulaires, ...this.titulairesPass]
        await axios.post('http://localhost:8080/api/event/buy', {params:{idEvent:this.eventIdSelected, user:sessionStorage.getItem("loggedIn"),prixTotal:this.prixTotal, billet:listOfBillet}})
        .then(response => {
          // Succès de la vérification
          this.eventInformation = response.data;
        })
        .catch(error => {
          // Erreur lors de la requête
          this.error = 'Une erreur s\'est produite lors de la récupération de l\'événement.';
          console.error(error);
        });
    },
    disconnect(){
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('loggedIn');
      this.$router.push('/');
    }
}
};
</script>