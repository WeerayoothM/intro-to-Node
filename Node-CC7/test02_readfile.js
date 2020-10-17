const fs = require('fs')

fs.readFile('./readme.txt', 'utf-8', (err, data) => {  // Call back คือสิ่งที่จะทำหลังจากไฟล์เสร็จ
    if (err) {
        console.log('Error...')
        return
    }
    console.log(data)
    fs.readFile('./codecamp.txt', (err, data) => {  // Call back คือสิ่งที่จะทำหลังจากไฟล์เสร็จ
        if (err) {
            console.log('Error...')
            return
        }
        console.log(data.toString())
    })
})



