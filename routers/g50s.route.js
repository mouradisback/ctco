const {G50} = require('../models/G50')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const g50s = await G50.find();

    if(g50s){
        return res.status(200).send(g50s)
    }else{
        return res.status(500).send('error getting g50s')
    }
})

router.get('/:id', async (req, res)=>{
    const g50 = await G50.findById(req.params.id);

    if(g50){
        return res.status(200).send(g50)
    }else{
        return res.status(500).send('error getting g50 by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const g50s = await G50.find({supplier: req.params.id});

    if(g50s){
        return res.status(200).send(g50s)
    }else{
        return res.status(500).send('error getting g50 by id')
    }
})

router.post('/', async(req, res)=>{

    let g50 = new G50({

        first_name: req.body.first_name,
        last_name: req.body.last_name,
        position: req.body.position,
        phone: req.body.phone,
        supplier: req.body.supplier,
        email: req.body.email
        
    })

     g50 = await g50.save()

    if(g50){
        return res.status(200).send(g50)
    }else{
        return res.status(500).send('error adding g50')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const g50 = await G50.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        position: req.body.position,
        phone: req.body.phone,
        supplier: req.body.supplier,
        email: req.body.email
        

    }, { new: true});

    
    if(g50){
        return res.status(200).send(g50)
    }else{
        return res.status(500).send('error updating g50')
    }

})

router.delete('/:id', (req, res)=>{

    G50.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'G50 supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet g50: ', err})
        }

    })

})



module.exports = router;