const {Fonction} = require('../models/Fonction')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const fonctions = await Fonction.find();

    if(fonctions){
        return res.status(200).send(fonctions)
    }else{
        return res.status(500).send('error getting fonctions')
    }
})

router.get('/:id', async (req, res)=>{
    const fonction = await Fonction.findById(req.params.id);

    if(fonction){
        return res.status(200).send(fonction)
    }else{
        return res.status(500).send('error getting fonction by id')
    }
})

router.post('/', async(req, res)=>{

    let fonction = new Fonction({

        name: req.body.name,
        salary_coef: req.body.salary_coef
        
    })

     fonction = await fonction.save()

    if(fonction){
        return res.status(200).send(fonction)
    }else{
        return res.status(500).send('error adding fonction')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const fonction = await Fonction.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        name: req.body.name,
        salary_coef: req.body.salary_coef
        

    }, { new: true});

    
    if(fonction){
        return res.status(200).send(fonction)
    }else{
        return res.status(500).send('error updating fonction')
    }

})

router.delete('/:id', (req, res)=>{

    Fonction.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Fonction supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet fonction: ', err})
        }

    })

})



module.exports = router;