const {Emplacement} = require('../models/Emplacement')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const emplacements = await Emplacement.find().populate('depot');

    if(emplacements){
        return res.status(200).send(emplacements)
    }else{
        return res.status(500).send('error getting emplacements')
    }
})

router.get('/:id', async (req, res)=>{
    const emplacement = await Emplacement.findById(req.params.id);

    if(emplacement){
        return res.status(200).send(emplacement)
    }else{
        return res.status(500).send('error getting emplacement by id')
    }
})

router.get('/depot/:id', async (req, res)=>{
    const emplacement = await Emplacement.find({depot: req.params.id});

    if(emplacement){
        return res.status(200).send(emplacement)
    }else{
        return res.status(500).send('error getting emplacement by id')
    }
})


router.post('/', async(req, res)=>{
    

    let emplacement = new Emplacement({

        name: req.body.name,
        ref: req.body.ref,
        created_at: Date.now(),
        depot: req.body.depot,
        
    })
    try{
        emplacement = await emplacement.save()
        return res.status(200).send(emplacement)
    } catch(error){
        console.log(error)
        if(error.code == '11000'){
            return res.status(400).send({message: "valeur exist deja"});
        }else{
            return res.status(500).send(error);
        }

    }

    

})


 
router.put('/:id', async(req, res)=>{

    
    const emplacement = await Emplacement.findByIdAndUpdate(req.params.id, {
        created_at: req.body.created_at,
        modified_at: Date.now(),
        name: req.body.name,
        ref: req.body.ref,
        depot: req.body.depot
        
    
    }, { new: true});

    
    if(emplacement){
        return res.status(200).send(emplacement)
    }else{
        return res.status(500).send('error updating emplacement')
    }

})

router.delete('/:id', (req, res)=>{

    Emplacement.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Emplacement supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet emplacement: ', err})
        }

    })

})



module.exports = router;