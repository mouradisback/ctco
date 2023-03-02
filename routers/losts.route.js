const {Lost} = require('../models/Lost')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const losts = await Lost.find();

    if(losts){
        return res.status(200).send(losts)
    }else{
        return res.status(500).send('error getting losts')
    }
})

router.get('/:id', async (req, res)=>{
    const lost = await Lost.findById(req.params.id);

    if(lost){
        return res.status(200).send(lost)
    }else{
        return res.status(500).send('error getting lost by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const losts = await Lost.find({supplier: req.params.id});

    if(losts){
        return res.status(200).send(losts)
    }else{
        return res.status(500).send('error getting lost by id')
    }
})

router.post('/', async(req, res)=>{

    let lost = new Lost({

        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note
      
        
    })

     lost = await lost.save()

    if(lost){
        return res.status(200).send(lost)
    }else{
        return res.status(500).send('error adding lost')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const lost = await Lost.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note

    }, { new: true});

    
    if(lost){
        return res.status(200).send(lost)
    }else{
        return res.status(500).send('error updating lost')
    }

})

router.delete('/:id', (req, res)=>{

    Lost.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Lost supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet lost: ', err})
        }

    })

})



module.exports = router;