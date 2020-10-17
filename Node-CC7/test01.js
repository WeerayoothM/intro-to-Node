const os = require('os')

let tmem = os.totalmem();
let fmem = os.freemem()
console.log(`total Ram = ${tmem} Free Memory = ${fmem}`)

console.log(`Mem Usage = ${tmem - fmem}`)

let cpus = os.cpus()
console.log(cpus)
console.log(os.version())
