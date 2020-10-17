const fs = require('fs')
const os = require('os')

const content = 'Some Content';

fs.writeFile('output.txt', content, err => {
    if (err) {
        console.error(err)
    }
    console.log(`content write on >>>> output.txt`)
})

let contentSysInfo = `CPU : ${os.cpus()[0].model}\n`
contentSysInfo += `Total Mem : ${os.totalmem()}\n`
contentSysInfo += `OS Version : ${os.version()}`
fs.writeFile('sysinfo.txt', contentSysInfo, err => {
    if (err) {
        console.error(err)
    }
    console.log(`content write on >>>> sysinfo.txt`)
})
