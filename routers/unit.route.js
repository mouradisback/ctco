const {Unit} = require('../models/Unit')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const units = await Unit.find();

    if(units){
        return res.status(200).send(units)
    }else{
        return res.status(500).send('error getting units')
    }
})

router.get('/:id', async (req, res)=>{
    const unit = await Unit.findById(req.params.id);

    if(unit){
        return res.status(200).send(unit)
    }else{
        return res.status(500).send('error getting unit by id')
    }
})

router.post('/', async(req, res)=>{
    console.log(req.body)

    let unit = new Unit({

        name: req.body.name,
        code: req.body.code
        
    })

     unit = await unit.save()

    if(unit){
        return res.status(200).send(unit)
    }else{
        return res.status(500).send('error adding unit')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const unit = await Unit.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        modified_at: Date.now(),
        name: req.body.name,
        code: req.body.code

    }, { new: true});

    
    if(unit){
        return res.status(200).send(unit)
    }else{
        return res.status(500).send('error updating unit')
    }

})

router.delete('/:id', (req, res)=>{

    Unit.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Unit supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet unit: ', err})
        }

    })

})



module.exports = router;