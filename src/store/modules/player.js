let player = []

// Attempt to back fill from localStroage, else generate sample player.
if (localStorage.getItem('card-api-app__player')) {
  player = JSON.parse(localStorage.getItem('card-api-app__player'))
} else {
  localStorage.setItem('card-api-app__player', JSON.stringify(player))
}

export default {
  state: {
    player,
  },
  getters: {
    player: state => {
      return state.player
    },
    getPlayerById: (state) => (id) => {
      return state.player.find(card => card.id === id)
    },
    getPlayerByType: (state) => (type) => {
      return state.player.find(card => card.apiType === type)
    },
  },
  mutations: {
    addPlayer (state, card) {
      state.player.push(card)
      // Update player in localStore, and state.
      localStorage.setItem('card-api-app__player', JSON.stringify(state.player))
    },
    updatePlayers (state, player) {
      state.player = player
      // Update player in localStore, and state.
      localStorage.setItem('card-api-app__player', JSON.stringify(state.player))
    },
    updatePlayerType (state, type, card) {
      const target = state.player.find(card => card.apiType === type)

      // If found, update the card.
      if (target) {
        // Fill in the new card content.
        for (let key in card) {
          if (target.hasOwnProperty(key)) {
            target[key] = card[key]
          }
        }
      }

      // Update player in localStore, and state.
      localStorage.setItem('card-api-app__player', JSON.stringify(state.player))
    },
  },
  actions: {},
}
