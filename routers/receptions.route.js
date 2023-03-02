const {Reception} = require('../models/Reception')
const express = require('express');
const { Return } = require('../models/Return');
const { Release } = require('../models/Release');

const router = express.Router();




router.get('/:id', async (req, res)=>{
    const reception = await Reception.findById(req.params.id);
Model
    if(reception){
        return res.status(200).send(reception)
    }else{
        return res.status(500).send('error getting reception by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const receptions = await Reception.find({supplier: req.params.id});

    if(receptions){
        return res.status(200).send(receptions)
    }else{
        return res.status(500).send('error getting reception by id')
    }
})

router.post('/', async(req, res)=>{

    let reception = new Reception({

        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note
        
    })

     reception = await reception.save()

    if(reception){
        return res.status(200).send(reception)
    }else{
        return res.status(500).send('error adding reception')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const reception = await Reception.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note
        

    }, { new: true});

    
    if(reception){
        return res.status(200).send(reception)
    }else{
        return res.status(500).send('error updating reception')
    }

})

router.delete('/:id', (req, res)=>{

    Reception.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Reception supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet reception: ', err})
        }

    })

})



module.exports = router;