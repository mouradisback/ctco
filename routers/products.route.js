const {Product} = require('../models/Product')
const express = require('express');
const { Category } = require('../models/Category');
const router = express.Router();



router.get('/', async (req, res)=>{
    const products = await Product.find().populate('category');

    if(products){
        return res.status(200).send(products)
    }else{
        return res.status(500).send('error getting products')
    }
})

router.get('/:id', async (req, res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
        return res.status(200).send(product)
    }else{
        return res.status(500).send('error getting product by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const products = await Product.find({supplier: req.params.id});

    if(products){
        return res.status(200).send(products)
    }else{
        return res.status(500).send('error getting product by id')
    }
})

router.post('/', async(req, res)=>{
    

    let product = new Product({

        name: req.body.name,
        ref: req.body.ref,
        no: req.body.no,
        description: req.body.description,
        unit: req.body.unit,
        stock_method: req.body.stock_method,
        type: req.body.type,
        coeficient: req.body.coeficient,
        purchase_price: req.body.purchase_price,
        sell_price: req.body.sell_price,
        category: req.body.category
        
    })

    
    try{
        product = await product.save()
        return res.status(200).send(product)
    } catch (error){
        console.log(error)
        if(error.code == '11000'){
            return res.status(400).send({message: "valeur exist deja"});
        }else{
            return res.status(500).send(error);
        }
    }

    

})

router.post('/bulk', async(req, res)=>{

    req.body.forEach( async el => {
         category = await Category.findOne({code: el.category})
         if(category) el.category = category._id
         else el.category = null

         let product = new Product({

            name: el.name,
            ref: el.ref,
            no: el.no,
            description: el.description,
            unit: el.unit,
            stock_method: el.stock_method,
            type: el.type,
            coeficient: el.coeficient,
            purchase_price: el.purchase_price,
            sell_price: el.sell_price,
            category: el.category
            
        })

         product = await product.save()
         
        
    });

    
    
    

})


 
router.put('/:id', async(req, res)=>{

    
    const product = await Product.findByIdAndUpdate(req.params.id, {

        name: req.body.name,
        ref: req.body.ref,
        no: req.body.no,
        description: req.body.description,
        unit: req.body.unit,
        stock_method: req.body.stock_method,
        type: req.body.type,
        coeficient: req.body.coeficient,
        purchase_price: req.body.purchase_price,
        sell_price: req.body.sell_price,
        category: req.body.category
        

    }, { new: true});

    
    if(product){
        return res.status(200).send(product)
    }else{
        return res.status(500).send('error updating product')
    }

})

router.delete('/:id', (req, res)=>{

    Product.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Product supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet product: ', err})
        }

    })

})



module.exports = router;