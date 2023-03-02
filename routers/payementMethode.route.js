const {Payementmethode} = require('../models/Payementmethode')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const payementmethodes = await Payementmethode.find();

    if(payementmethodes){
        return res.status(200).send(payementmethodes)
    }else{
        return res.status(500).send('error getting payementmethodes')
    }
})

router.get('/:id', async (req, res)=>{
    const payementmethode = await Payementmethode.findById(req.params.id);

    if(payementmethode){
        return res.status(200).send(payementmethode)
    }else{
        return res.status(500).send('error getting payementmethode by id')
    }
})

router.post('/', async(req, res)=>{
    console.log(req.body)

    let payementmethode = new Payementmethode({

        name: req.body.name,
        account: req.body.account
    })

     payementmethode = await payementmethode.save()

    if(payementmethode){
        return res.status(200).send(payementmethode)
    }else{
        return res.status(500).send('error adding payementmethode')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const payementmethode = await Payementmethode.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        modified_at: Date.now(),
        name: req.body.name,
        account: req.body.account
        

    }, { new: true});

    
    if(payementmethode){
        return res.status(200).send(payementmethode)
    }else{
        return res.status(500).send('error updating payementmethode')
    }

})

router.delete('/:id', (req, res)=>{

    Payementmethode.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Payementmethode supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet payementmethode: ', err})
        }

    })

})



module.exports = router;