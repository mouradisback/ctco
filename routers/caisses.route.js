const {Caisse} = require('../models/Caisse')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const caisses = await Caisse.aggregate([
        {
            $lookup:{
                from: "employees",
                localField: "employee",
                foreignField: "_id",
                as: "employee"
            }
        },
        {
            $lookup:{
                from: "mouvements",
                localField: "_id",
                foreignField: "source",
                as: "mouvements_out"
            }
        },
        
        {
            $lookup:{
                from: "mouvements",
                localField: "_id",
                foreignField: "destination",
                as: "mouvements_in"
            }
        },
        {
            $addFields: {
                total_out: { $sum: "$mouvements_out.amount"},
            }
        },
        {
            $addFields: {
                total_in: { $sum: "$mouvements_in.amount"},
            }
        },
        {
            $unwind:{
                path: "$employee",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                solde: { $add: ['$initial_amount', {$subtract:['$total_in', '$total_out']}]},
            }
        },

    ]);

    if(caisses){
        return res.status(200).send(caisses)
    }else{
        return res.status(500).send('error getting caisses')
    }
})

router.get('/:id', async (req, res)=>{
    const caisse = await Caisse.findById(req.params.id);

    if(caisse){
        return res.status(200).send(caisse)
    }else{
        return res.status(500).send('error getting caisse by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const caisses = await Caisse.find({supplier: req.params.id});

    if(caisses){
        return res.status(200).send(caisses)
    }else{
        return res.status(500).send('error getting caisse by id')
    }
})

router.post('/', async(req, res)=>{

    let caisse = new Caisse({

        name: req.body.name,
        description: req.body.description,
        initial_amount: req.body.initial_amount,
        solde: req.body.solde,
        employee: req.body.employee
        
    })

     caisse = await caisse.save()

    if(caisse){
        return res.status(200).send(caisse)
    }else{
        return res.status(500).send('error adding caisse')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const caisse = await Caisse.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        name: req.body.name,
        description: req.body.description,
        initial_amount: req.body.initial_amount,
        solde: req.body.solde,
        employee: req.body.employee
        

    }, { new: true});

    
    if(caisse){
        return res.status(200).send(caisse)
    }else{
        return res.status(500).send('error updating caisse')
    }

})

router.delete('/:id', (req, res)=>{

    Caisse.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Caisse supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet caisse: ', err})
        }

    })

})



module.exports = router;