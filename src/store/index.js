import { createStore } from 'vuex'

export default createStore({
  state: {
    diaryEntries: [],
    goals: [],
    visualBoardItems: []
  },
  getters: {
    getDiaryEntries: state => state.diaryEntries,
    getGoals: state => state.goals,
    getVisualBoardItems: state => state.visualBoardItems
  },
  mutations: {
    addDiaryEntry(state, entry) {
      state.diaryEntries.push(entry)
      localStorage.setItem('diaryEntries', JSON.stringify(state.diaryEntries))
    },
    loadDiaryEntries(state, entries) {
      state.diaryEntries = entries
    },
    deleteDiaryEntry(state, index) {
      state.diaryEntries.splice(index, 1)
      localStorage.setItem('diaryEntries', JSON.stringify(state.diaryEntries))
    },
    addGoal(state, goal) {
      state.goals.push(goal)
      localStorage.setItem('goals', JSON.stringify(state.goals))
    },
    updateGoal(state, { index, goal }) {
      state.goals[index] = goal
      localStorage.setItem('goals', JSON.stringify(state.goals))
    },
    deleteGoal(state, index) {
      state.goals.splice(index, 1)
      localStorage.setItem('goals', JSON.stringify(state.goals))
    },
    loadGoals(state, goals) {
      state.goals = goals
    },
    addVisualBoardItem(state, item) {
      state.visualBoardItems.push(item)
      localStorage.setItem('visualBoardItems', JSON.stringify(state.visualBoardItems))
    },
    updateVisualBoardItem(state, { index, item }) {
      state.visualBoardItems[index] = item
      localStorage.setItem('visualBoardItems', JSON.stringify(state.visualBoardItems))
    },
    loadVisualBoardItems(state, items) {
      state.visualBoardItems = items
    }
  },
  actions: {
    initializeStore({ commit }) {
      // Load diary entries from localStorage
      const diaryEntries = localStorage.getItem('diaryEntries')
      if (diaryEntries) {
        commit('loadDiaryEntries', JSON.parse(diaryEntries))
      }

      // Load goals from localStorage
      const goals = localStorage.getItem('goals')
      if (goals) {
        commit('loadGoals', JSON.parse(goals))
      }

      // Load visual board items from localStorage
      const visualBoardItems = localStorage.getItem('visualBoardItems')
      if (visualBoardItems) {
        commit('loadVisualBoardItems', JSON.parse(visualBoardItems))
      }
    }
  },
  modules: {
  }
})
