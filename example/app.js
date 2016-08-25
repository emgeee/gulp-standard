var test = 'test'

function App () {
  return new View(test)
}

function View () {
  return {
    render: function (state) {
      return state
    }
  }
}

module.exports = new App()
