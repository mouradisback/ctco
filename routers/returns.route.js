const {Return} = require('../models/Return')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const returns = await Return.find();

    if(returns){
        return res.status(200).send(returns)
    }else{
        return res.status(500).send('error getting returns')
    }
})

router.get('/:id', async (req, res)=>{
    const _return = await Return.findById(req.params.id);

    if(_return){
        return res.status(200).send(_return)
    }else{
        return res.status(500).send('error getting return by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const returns = await Return.find({supplier: req.params.id});

    if(returns){
        return res.status(200).send(returns)
    }else{
        return res.status(500).send('error getting return by id')
    }
})

router.post('/', async(req, res)=>{

    let _return = new Return({

        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note
        
    })

     _return = await _return.save()

    if(_return){
        return res.status(200).send(_return)
    }else{
        return res.status(500).send('error adding return')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const _return = await Return.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note
        

    }, { new: true});

    
    if(_return){
        return res.status(200).send(_return)
    }else{
        return res.status(500).send('error updating return')
    }

})

router.delete('/:id', (req, res)=>{

    Return.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Return supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet return: ', err})
        }

    })

})



module.exports = router;