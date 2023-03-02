const {Departement} = require('../models/Departement')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const departements = await Departement.find();

    if(departements){
        return res.status(200).send(departements)
    }else{
        return res.status(500).send('error getting departements')
    }
})

router.get('/:id', async (req, res)=>{
    const departement = await Departement.findById(req.params.id);

    if(departement){
        return res.status(200).send(departement)
    }else{
        return res.status(500).send('error getting departement by id')
    }
})

router.post('/', async(req, res)=>{

    let departement = new Departement({

        name: req.body.name,
        code: req.body.code
        
    })

     departement = await departement.save()

    if(departement){
        return res.status(200).send(departement)
    }else{
        return res.status(500).send('error adding departement')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const departement = await Departement.findByIdAndUpdate(req.params.id, {
        modified_at: Date.now(),
        created_at: req.body.created_at,
        name: req.body.name,
        code: req.body.code

    }, { new: true});

    
    if(departement){
        return res.status(200).send(departement)
    }else{
        return res.status(500).send('error updating departement')
    }

})

router.delete('/:id', (req, res)=>{

    Departement.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Departement supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet departement: ', err})
        }

    })

})



module.exports = router;