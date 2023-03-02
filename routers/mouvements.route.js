const {Mouvement} = require('../models/Mouvement')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const mouvements = await Mouvement.find().populate('source').populate('destination');

    if(mouvements){
        return res.status(200).send(mouvements)
    }else{
        return res.status(500).send('error getting mouvements')
    }
})

router.get('/:start/:end', async (req, res)=>{

    var start = new Date(parseInt(req.params.start))
    var end = new Date(parseInt(req.params.end))
    console.log(end)

    const mouvements = await Mouvement.aggregate([
        {
            $match: {
            
            }
        },
    ]);

    if(mouvements){
        return res.status(200).send(mouvements)
    }else{
        return res.status(500).send('error getting mouvements')
    }
})

router.get('/:id', async (req, res)=>{
    const mouvement = await Mouvement.findById(req.params.id);

    if(mouvement){
        return res.status(200).send(mouvement)
    }else{
        return res.status(500).send('error getting mouvement by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const mouvements = await Mouvement.find({supplier: req.params.id});

    if(mouvements){
        return res.status(200).send(mouvements)
    }else{
        return res.status(500).send('error getting mouvement by id')
    }
})

router.post('/', async(req, res)=>{

    let mouvement = new Mouvement({

        date: req.body.date,
        amount: req.body.amount,
        motif: req.body.motif,
        source: req.body.source,
        destination: req.body.destination
        
    })

     mouvement = await mouvement.save()

    if(mouvement){
        return res.status(200).send(mouvement)
    }else{
        return res.status(500).send('error adding mouvement')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const mouvement = await Mouvement.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        date: req.body.date,
        amount: req.body.amount,
        motif: req.body.motif,
        source: req.body.source,
        destination: req.body.destination
        

    }, { new: true});

    
    if(mouvement){
        return res.status(200).send(mouvement)
    }else{
        return res.status(500).send('error updating mouvement')
    }

})

router.delete('/:id', (req, res)=>{

    Mouvement.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Mouvement supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet mouvement: ', err})
        }

    })

})



module.exports = router;