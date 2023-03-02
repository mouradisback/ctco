const {Payement} = require('../models/Payement')
const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


router.get('/', async (req, res)=>{
    const payements = await Payement.find();

    if(payements){
        return res.status(200).send(payements)
    }else{
        return res.status(500).send('error getting payements')
    }
})

router.get('/:id', async (req, res)=>{
    const payement = await Payement.findById(req.params.id);

    if(payement){
        return res.status(200).send(payement)
    }else{
        return res.status(500).send('error getting payement by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const payements = await Payement.aggregate([
        {
            $match:{ supplier: ObjectId(req.params.id) }
        },
        {
            $lookup:{
                from: 'purchases',
                localField: 'purchase',
                foreignField: '_id',
                as: 'purchase'
            }
        },
        {
            $unwind:{
                path: '$purchase',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup:{
                from: 'caisses',
                localField: 'caisse',
                foreignField: '_id',
                as: 'caisse'
            }
        },
        {
            $unwind:{
                path: '$caisse',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields:{
                solde:{
                    $subtract:['$purchase.total_ttc', '$amount']
                }
            }
        }
       
    ]);

    if(payements){
        return res.status(200).send(payements)
    }else{
        return res.status(500).send('error getting payement by id')
    }
})

router.get('/purchase/:id', async (req, res)=>{
    const payements = await Payement.aggregate([
        {
            $match:{ purchase: ObjectId(req.params.id) }
        },
        {
            $lookup:{
                from: 'caisses',
                localField: 'caisse',
                foreignField: '_id',
                as: 'caisse'
            }
        },
        {
            $unwind:{
                path: '$caisse',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group:{
                _id: null,
                payements: { $push: "$$ROOT"},
                total_payement: { $sum: '$amount'}
            }
                
        }
       
    ]);

    if(payements){
        return res.status(200).send(payements)
    }else{
        return res.status(500).send('error getting payement by id')
    }
})





router.post('/', async(req, res)=>{

    let payement = new Payement({

        date: req.body.date,
        amount: req.body.amount,
        type: req.body.type,
        method: req.body.method,
        caisse: req.body.caisse,
        bank: req.body.bank,
        invoice: req.body.invoice,
        purchase: req.body.purchase,
        cheque_no: req.body.cheque_no,
        virement_no: req.body.virement_no,
        supplier: req.body.supplier
        
    })

     payement = await payement.save()

    if(payement){
        return res.status(200).send(payement)
    }else{
        return res.status(500).send('error adding payement')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const payement = await Payement.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        date: req.body.date,
        amount: req.body.amount,
        type: req.body.type,
        method: req.body.method,
        caisse: req.body.caisse,
        bank: req.body.bank,
        invoice: req.body.invoice,
        purchase: req.body.purchase,
        cheque_no: req.body.cheque_no,
        virement_no: req.body.virement_no,
        supplier: req.body.supplier
        

    }, { new: true});

    
    if(payement){
        return res.status(200).send(payement)
    }else{
        return res.status(500).send('error updating payement')
    }

})

router.delete('/:id', (req, res)=>{

    Payement.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Payement supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet payement: ', err})
        }

    })

})



module.exports = router;