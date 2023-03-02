const {Depot} = require('../models/Depot')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const depots = await Depot.find().populate('employee');

    if(depots){
        return res.status(200).send(depots)
    }else{
        return res.status(500).send('error getting depots')
    }
})

router.get('/:id', async (req, res)=>{
    const depot = await Depot.findById(req.params.id);

    if(depot){
        return res.status(200).send(depot)
    }else{
        return res.status(500).send('error getting depot by id')
    }
})


router.post('/', async(req, res)=>{
    

    let depot = new Depot({

        name: req.body.name,
        ref: req.body.ref,
        description: req.body.description,
        created_at: Date.now(),
        employee: req.body.employee,
        address: req.body.address
        
    })
    try{
        depot = await depot.save()
        return res.status(200).send(depot)
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

    
    const depot = await Depot.findByIdAndUpdate(req.params.id, {
        created_at: req.body.created_at,
        modified_at: Date.now(),
        name: req.body.name,
        ref: req.body.ref,
        description: req.body.description,
        employee: req.body.employee,
        address: req.body.address
        
        

    }, { new: true});

    
    if(depot){
        return res.status(200).send(depot)
    }else{
        return res.status(500).send('error updating depot')
    }

})

router.delete('/:id', (req, res)=>{

    Depot.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Depot supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet depot: ', err})
        }

    })

})



module.exports = router;