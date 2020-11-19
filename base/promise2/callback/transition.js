
function perform (anymethod, wrappers) {
  return function () {

    wrappers.forEach(wrapper => wrapper.initialize())
    anymethod()
    wrappers.forEach(wrapper => wrapper.close())
  }

}
var newFun = perform(function () {
  console.log('say');
}, [
  {
    initialize: function () {
      console.log('before 1');
    },
    close: function () {
      console.log('close 1');
    }
  },
  {
    initialize: function () {
      console.log('before 2');
    },
    close: function () {
      console.log('close 2');
    }
  }
])
newFun()
