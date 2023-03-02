const {Taxe} = require('../models/Taxe')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const taxes = await Taxe.find();

    if(taxes){
        return res.status(200).send(taxes)
    }else{
        return res.status(500).send('error getting taxes')
    }
})

router.get('/:id', async (req, res)=>{
    const taxe = await Taxe.findById(req.params.id);

    if(taxe){
        return res.status(200).send(taxe)
    }else{
        return res.status(500).send('error getting taxe by id')
    }
})

router.post('/', async(req, res)=>{
    console.log(req.body)

    let taxe = new Taxe({

        name: req.body.name,
        value: req.body.value,
        account: req.body.account
    })

     taxe = await taxe.save()

    if(taxe){
        return res.status(200).send(taxe)
    }else{
        return res.status(500).send('error adding taxe')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const taxe = await Taxe.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        modified_at: Date.now(),
        name: req.body.name,
        value: req.body.value,
        account: req.body.account
        

    }, { new: true});

    
    if(taxe){
        return res.status(200).send(taxe)
    }else{
        return res.status(500).send('error updating taxe')
    }

})

router.delete('/:id', (req, res)=>{

    Taxe.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Taxe supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet taxe: ', err})
        }

    })

})



module.exports = router;