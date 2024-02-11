//comes with nodejs
const http = require('http')
const process = require('process')

const { 
    getProducts, 
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
} = require('./controllers/productControllers')

function matchURL(url) {
    return url.match(/\/api\/products\/([0-9]+)/)
}

const server = http.createServer((req, res) => {
    /*
    Manual way of doing things

    // set status code
    // 200 --> successful, 201 --> created
    // 300 --> redirects
    // 400 --> bad requests, 404 --> not found
    // 500 --> server errors
    res.statusCode = 200

    // content type, auth headers
    res.setHeader('Content-Type', 'text/html')

    // actual content body
    res.write('<h1>Hello World</h1>')

    res.end()
    */

    // check for request url path and type
    // create a better router if possible
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if (matchURL(req.url) && req.method === 'GET') {
        const id = req.url.split('/')[3] // gets the id from api/products/{id}
        getProduct(req, res, id)
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if (matchURL(req.url) && req.method === 'PUT') {
        const id = req.url.split('/')[3] // gets the id from api/products/{id}
        updateProduct(req, res, id)
    } else if (matchURL(req.url) && req.method === 'DELETE') {
        const id = req.url.split('/')[3] // gets the id from api/products/{id}
        removeProduct(req, res, id)
    }else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message : 'Route Not Found' }))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})