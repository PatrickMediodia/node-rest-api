const Product = require('../models/productModel')
const { getPostData } = require('../utils')

// @desc    Gets all products
// @route   GET /api/products
async function getProducts(req, res) {
    try {
        // need to await since Product.findAll returns a promise
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets specific products
// @route   GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        // need to await since Product.findAll returns a promise
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Product Not Found'}))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Creates a product
// @route   POST /api/products
async function createProduct(req, res) {
    try {
        // get body data from post request
        const body = await getPostData()

        // destructure itle, description, and price from body
        const { title, description, price } = JSON.parse(body)

        // create a new instance of product
        // no id since it will be handled by the model
        const product = {
            title,
            description,
            price,
        }

        // send the product instance and receive the created object
        const newProduct = await Product.create(product)

        // 201 since successful creation
        res.writeHead(201, { 'Content-Type': 'application/json' })

        // return the new product added to the datanase
        return res.end(JSON.stringify(newProduct))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Product Not Found'}))
        } else {
            const body = await getPostData(req)

            // destructure title, description, and price from body
            const { title, description, price } = JSON.parse(body)
            
            // create a new instance of product with the new filed
            // id that will be used is the one that was passed
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price,
            }

            // send the updated product instance and receive the created object
            const updatedProduct = await Product.update(id, productData)

            // 200 since successful update
            res.writeHead(200, { 'Content-Type': 'application/json' })

            // return the updated product
            return res.end(JSON.stringify(updatedProduct))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
async function removeProduct(req, res, id) {
    try {
        // need to await since Product.findAll returns a promise
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Product Not Found'}))
        } else {
            await Product.remove(id)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : `Product with id ${id} has been removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
}