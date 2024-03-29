import { createStore } from 'vuex'


export default createStore({
  state: {
    isLoggedIn: false, // !localStorage.getItem("access_token"),
    tokens: {
      accessToken: null,
      refreshToken: null
    },
    surveys : [],
    lastDocSnap : null,
    surveyToPass : null,
    maps: {
      panelInflowPathMap: {
        "KAKAO": "카카오톡", "EVERYTIME": "에브리타임", "INSTAGRAM": "인스타그램", "ACQUAINTANCE":"지인추천", "ETC": "기타"
      },
      surveyStatusNumberMap: {
        "CREATED" : 0, "WAITING" : 1, "IN_PROGRESS" : 2, "DONE" : 3
      },
      surveyStatusMap: {
        "CREATED" : "주문 완료", "WAITING" : "검수 대기", "IN_PROGRESS" : "진행중", "DONE" : "완료"
      },
      surveySpendTimeMap: {
        "TIME_0" : "1분 이내", "TIME_1_3" : "1~3분", "TIME_4_6" : '4~6분', "TIME_7_10" : '7~10분', "TIME_11_15" : '11~15분', "TIME_16_20" : '16~20분'
      },
      surveyIdentityMap: {
        "MID_HIGH" : "중고등", "UNDERGRADUATE" : "대학생", "GRADUATE" : "대학원생", "NONE" : "일반"
      },
      surveyTargetAgeMap: {
        "ALL" : "무관", "AGE_20_24" : "20-24세", "AGE_25_29" : "25-29세", "AGE_30_34" : '30-34세', "AGE_35_39" : '35-39세', "AGE_40_44" : '40-44세', "AGE_45_49" : '45-49세', "AGE_50_59" : '50대', "AGE_60_69" : '60대'
      },
      surveyTargetGenderMap: {
        'ALL' : "무관", "MALE" : "남성", "FEMALE" : "여성"
      }
    }
  },
  getters: {
    isLoggedIn() {
      // return state.tokens.accessToken == null ? false : true
      return localStorage.getItem("access_token") == null ? false : true
    }
  },
  mutations: {
    setTokensMutation(state, _tokens) {
      state.isLoggedIn = true
      state.tokens.accessToken = _tokens.accessToken
      state.tokens.refreshToken = _tokens.refreshToken
    },

    setAccessTokenMutation(state, _accesToken) {
      state.tokens.accessToken = _accesToken
    },

    logoutMutation(state) {
      state.isLoggedIn = false
      state.tokens.accessToken =  null
      state.tokens.refreshToken = null
    }
  },
  actions: {
    setTokens: ({commit}, _tokens) => {
      commit('setTokensMutation', _tokens)
      localStorage.setItem("access_token", _tokens.accessToken)
      localStorage.setItem("refresh_token", _tokens.refreshToken)
    },

    setAccessTokens: ({commit}, _accesToken) => {
      commit('setAccessTokensMutation', _accesToken)
      localStorage.setItem("access_token", _accesToken)
    },

    logout: ({commit}) => {
      commit('logoutMutiation')
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
    }
  },
  
 })