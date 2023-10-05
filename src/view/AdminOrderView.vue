<template>
  <h1>admin order view</h1> 

  <table>
    <th>ID</th>
    <th>설문제목</th>
    <th>progress</th>
    <th>price</th>

    <tr v-for="item in (surveys)" :key="item.id">
      <td>{{item.id}}</td>
      <td>{{item.title}}</td>
      <td>{{item.progress}}</td>
      <td>{{item.price}}</td>
    </tr>
  </table>

  <button @click="loadMore()">더 불러오기</button>
</template>

<script>
import { collection,getDocs, query, orderBy, limit, startAfter} from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
export default {
  computed: {
    surveys() {
      return this.$store.state.surveys
    }
  },
  methods: {
     async fetchSurveyData() {
      console.log("fetchSurveyData")
      var docSnap = null;
      var surveyList = [];
      const db = getFirestore();
      const docRef = collection(db, "surveyData")
      const q = query(docRef, orderBy("id", "desc"), limit(20))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if(doc.data().id > 340) surveyList.push(doc.data())
        docSnap = doc
        
      })
      this.$store.state.surveys = surveyList
      this.$store.state.lastDocSnap = docSnap
      console.log(surveyList)
    },

    async loadMore() {
      console.log("loadMore")
      var surveyList = [];
      var docSnap = this.$store.state.lastDocSnap
      const db = getFirestore();
      const docRef = collection(db, "surveyData")
      const q = query(docRef, orderBy("id", "desc"), startAfter(docSnap), limit(20));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        if(doc.data().id > 340) surveyList.push(doc.data())
        docSnap = doc
        
      })
      // this.$store.state.surveys += surveyList
      this.$store.state.lastDocSnap = docSnap
      this.$store.state.surveys = this.$store.state.surveys.concat(surveyList);
      console.log(this.$store.state.surveys)
    }
  },
  mounted() {
    this.fetchSurveyData();
  }
}
</script>

<style>

</style>
