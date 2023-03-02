const {Bank} = require('../models/Bank')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const banks = await Bank.find()
        
    if(banks){
        return res.status(200).send(banks)
    }else{
        return res.status(500).send('error getting banks')
    }
})

router.get('/:id', async (req, res)=>{
    const bank = await Bank.findById(req.params.id);

    if(bank){
        return res.status(200).send(bank)
    }else{
        return res.status(500).send('error getting bank by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const banks = await Bank.find({supplier: req.params.id});

    if(banks){
        return res.status(200).send(banks)
    }else{
        return res.status(500).send('error getting bank by id')
    }
})

router.post('/', async(req, res)=>{

    let bank = new Bank({

        name: req.body.name,
        address: req.body.address,
        initial_solde: req.body.initial_solde,
        account_no: req.body.account_no
        
    })

     bank = await bank.save()

    if(bank){
        return res.status(200).send(bank)
    }else{
        return res.status(500).send('error adding bank')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const bank = await Bank.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        name: req.body.name,
        address: req.body.address,
        initial_solde: req.body.initial_solde,
        account_no: req.body.account_no
        

    }, { new: true});

    
    if(bank){
        return res.status(200).send(bank)
    }else{
        return res.status(500).send('error updating bank')
    }

})

router.delete('/:id', (req, res)=>{

    Bank.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Bank supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet bank: ', err})
        }

    })

})



module.exports = router;