const {Category} = require('../models/Category')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const categories = await Category.find();

    if(categories){
        return res.status(200).send(categories)
    }else{
        return res.status(500).send('error getting categories')
    }
})

router.get('/detail', async (req, res)=>{
    const categories = await Category.find({type: 'Détails'});

    if(categories){
        return res.status(200).send(categories)
    }else{
        return res.status(500).send('error getting categories')
    }
})

router.get('/:id', async (req, res)=>{
    const category = await Category.findById(req.params.id);

    if(category){
        return res.status(200).send(category)
    }else{
        return res.status(500).send('error getting category by id')
    }
})

router.post('/', async(req, res)=>{

    let category = new Category({

        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        stock_method: req.body.stock_method,
        unit: req.body.unit,
        coeficient: req.body.coeficient,
        type: req.body.type,
        parent_category: req.body.parent_category
       
    })

    try{
        category = await category.save()
        return res.status(200).send(category)
    } catch(error){
        console.log(error)
        if(error.code == '11000'){
            return res.status(400).send({message: "valeur exist deja"});
        }else{
            return res.status(500).send(error);
        }
    }

})

router.post('/bulk', async(req, res)=>{

    Category.insertMany(req.body).then(function() {
       
        console.log('successful')
    }).catch(function(error){
        console.log(error)
    })

   

})


 
router.put('/:id', async(req, res)=>{

    try{
        const category = await Category.findByIdAndUpdate(req.params.id, {

            created_at: req.body.created_at,
            modified_at: Date.now(),
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            stock_method: req.body.stock_method,
            unit: req.body.unit,
            coeficient: req.body.coeficient,
            type: req.body.type,
            parent_category: req.body.parent_category
            
    
        }, { new: true});
        return res.status(200).send(category)
    } catch(error){
        console.log(error)
        if(error.code == '11000'){
            return res.status(400).send({message: "valeur exist deja"});
        }else{
            return res.status(500).send(error);
        }
    }


})

router.delete('/:id', (req, res)=>{

    Category.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Category supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet category: ', err})
        }

    })

})



module.exports = router;