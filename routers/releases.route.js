const {Release} = require('../models/Release')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const releases = await Release.find();

    if(releases){
        return res.status(200).send(releases)
    }else{
        return res.status(500).send('error getting releases')
    }
})

router.get('/:id', async (req, res)=>{
    const release = await Release.findById(req.params.id);

    if(release){
        return res.status(200).send(release)
    }else{
        return res.status(500).send('error getting release by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const releases = await Release.find({supplier: req.params.id});

    if(releases){
        return res.status(200).send(releases)
    }else{
        return res.status(500).send('error getting release by id')
    }
})

router.post('/', async(req, res)=>{

    let release = new Release({

        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note
        
    })

     release = await release.save()

    if(release){
        return res.status(200).send(release)
    }else{
        return res.status(500).send('error adding release')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const release = await Release.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        date: req.body.date,
        ref: req.body.ref,
        no: req.body.no,
        items: req.body.items,
        note: req.body.note
        

    }, { new: true});

    
    if(release){
        return res.status(200).send(release)
    }else{
        return res.status(500).send('error updating release')
    }

})

router.delete('/:id', (req, res)=>{

    Release.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Release supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet release: ', err})
        }

    })

})



module.exports = router;