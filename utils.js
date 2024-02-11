const { rejects } = require('assert')
const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'UTF-8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            
            // append all chunk data to body
            req.on('data', (chunk) => {
                body += chunk.toString();
            })

            // resolve on end of appending
            req.on('end', () => {
                resolve(body)
            })
            
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData,
}