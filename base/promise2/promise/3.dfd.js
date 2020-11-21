let Promise = require('./Promise')
let fs = require('fs')

function read (url) {
  let dfd = Promise.defer()
  fs.readFile(url, 'utf8', function (err, data) {
    if (err) dfd.reject(err)
    dfd.resolve(data)
  })
  return dfd.promise
}
read('./name.txt').then(d => console.log(d))