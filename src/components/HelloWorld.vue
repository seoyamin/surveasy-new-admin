<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="fetchSurveyData()">test</button>
      {{this.surveyList}}
    </div>
    
  </div>
</template>

<script>
import { collection,getDocs, query, orderBy, limit } from "firebase/firestore"
// import db from 'config/firebaseConfig.js'
import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
export default {
  data(){
    return {
      surveyList : []
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
     async fetchSurveyData() {
      const db = getFirestore();
      const docRef = collection(db, "surveyData")
      
      const q = query(docRef, orderBy("id", "desc"), limit(20))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if(doc.data().id > 340) this.surveyList.push(doc.data())
        
      })

      // this.$store.state.adminDataSurvey = this.surveyList
      console.log(this.surveyList)
    },
  }
  // mounted() {
  //   // const firebaseApp = initializeApp(firebaseConfig);
  //   this.fetchSurveyData();
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
