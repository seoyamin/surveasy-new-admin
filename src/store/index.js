import { createStore } from 'vuex'


export default createStore({
  state: {
    surveys : [],
    lastDocSnap : null,
    surveyToPass : null,
    surveyStatusMap: {
      "CREATED" : 0, "WAITING" : 1, "IN_PROGRESS" : 2, "DONE" : 3
    },
  },
  mutations: {
    
  },
  actions: {
    
  }
 })