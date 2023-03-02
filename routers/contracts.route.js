const {Contract} = require('../models/Contract')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const contracts = await Contract.find();

    if(contracts){
        return res.status(200).send(contracts)
    }else{
        return res.status(500).send('error getting contracts')
    }
})

router.get('/:id', async (req, res)=>{
    const contract = await Contract.findById(req.params.id);

    if(contract){
        return res.status(200).send(contract)
    }else{
        return res.status(500).send('error getting contract by id')
    }
})

router.get('/employee/:id', async (req, res)=>{
    const contracts = await Contract.find({employee: req.params.id}).populate('fonction');

    if(contracts){
        return res.status(200).send(contracts)
    }else{
        return res.status(500).send('error getting contract by id')
    }
})

router.post('/', async(req, res)=>{

    let contract = new Contract({

        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        salary: req.body.salary,
        employee: req.body.employee,
        fonction: req.body.fonction
        
    })

     contract = await contract.save()

    if(contract){
        return res.status(200).send(contract)
    }else{
        return res.status(500).send('error adding contract')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const contract = await Contract.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        type: req.body.type,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        salary: req.body.salary,
        employee: req.body.employee,
        fonction: req.body.fonction
        

    }, { new: true});

    
    if(contract){
        return res.status(200).send(contract)
    }else{
        return res.status(500).send('error updating contract')
    }

})

router.delete('/:id', (req, res)=>{

    Contract.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Contract supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet contract: ', err})
        }

    })

})



module.exports = router;