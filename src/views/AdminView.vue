<template>
  <div class="grid">
    <button className="button place-self-end hover:bg-gray-400 bg-cyan-300 py-2 w-2/12 h-16 place-content-center text-2xl text-center font-bold font-spegiel-bold text-white uppercase rounded relative md:py-2 md:text-sm lg:text-base xl:text-xl"  @click="disconnect()">Déconnexion</button>
  </div>
    <div class="about">
      <h1>Pannel administrateur</h1>
      <div>
        <table className="min-w-full bg-gray-400 border border-gray-300">
            <thead>
                <tr>
                    <th className="py-2 px-4 bg-gray-600 border-b">Evénement</th>
                    <th className="py-2 px-4 bg-gray-600 border-b">Nombre d'entrées individuelles</th>
                    <th className="py-2 px-4 bg-gray-600 border-b">Nombre de "multipass"</th>
                    <th className="py-2 px-4 bg-gray-600 border-b">Montant total billeterie ($)</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="(evenement, index) in evenements" :key="index">
                        <td className="py-2 px-4 border-b">{{ evenement.name }}</td>
                        <td className="py-2 px-4 border-b text-center">{{ evenement.nbPlaceUnit }}</td>
                        <td className="py-2 px-4 border-b text-center">{{ evenement.nbPass }}</td>
                        <td className="py-2 px-4 border-b text-center">{{ evenement.montentTotal }}</td>
                    </tr>
                <tr>
                    <td className="py-2 px-4 border-b text-2xl">Total</td>
                    <td className="py-2 px-4 border-b text-center">20000</td>
                    <td className="py-2 px-4 border-b text-center">10400</td>
                    <td className="py-2 px-4 border-b text-center">30400</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </template>
  
<script>
export default {
  data() {
    return {
        evenements: [{
            name:"Bordeaux Total Games",
            nbPlaceUnit:"300",
            nbPass:"40",
            montentTotal:"1700"
        },
        {
            name:"Strasbourg Gamers Show",
            nbPlaceUnit:"200",
            nbPass:"30",
            montentTotal:"1200"
        },{
            name:"Nimes Gamers",
            nbPlaceUnit:"700",
            nbPass:"10",
            montentTotal:"4600"
        },{
            name:"Montpellier Gaming Live",
            nbPlaceUnit:"350",
            nbPass:"79",
            montentTotal:"3800"
        },{
            name:"Lyon Esport",
            nbPlaceUnit:"6000",
            nbPass:"300",
            montentTotal:"9500"
        },
    ],
    totalBilleterie: 0,
    totalBilletUnit:0,
    totalBilletPass:0,
    totalBilleterieBordeaux:0,
    totalBilleterieStrasbourg:0,
    totalBilleterieNimes:0,
    totalBilleterieMontpellier:0,
    totalBilleterieLyon:0,
    };
  },
  created() {
    this.getEvenementInformation();
  },
  methods: {
    getEvenementInformation(){
        //Appel API pour récuperer les informations des événements
    },
    disconnect(){
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('loggedIn');
      this.$router.push('/');
    }
  }
};
</script>