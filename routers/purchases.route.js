const {Purchase} = require('../models/Purchase')
const express = require('express');
const { PurchaseHeader } = require('../models/Purchase_header');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const zeroPad = (num, places) => String(num).padStart(places, '0')
function setNull(value){
    if(value) {return value} else {return null}
}

router.get('/', async (req, res)=>{
    //const purchases = await Purchase.find().populate('supplier');
    const purchases = await Purchase.aggregate([
        {
            $match: {
                next_purchase: null
            }

        },
        {
            $lookup:{
                from: 'suppliers',
                localField: 'supplier',
                foreignField: '_id',
                as: 'supplier'
            }
        },
        {
             $unwind:{ 
                path: '$supplier',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup:{
                from: 'payements',
                localField: '_id',
                foreignField: 'purchase',
                as: 'payements'
            }
        },
        {
            $addFields:{
                total_payement:{
                    $sum:'$payements.amount'
                }
            }
        },
        {
            $sort: { 'date' : -1}
        }
     ]);

    if(purchases){
        return res.status(200).send(purchases)
    }else{
        return res.status(500).send('error getting purchases')
    }
})

router.get('/history/:id', async (req, res)=>{
    //const purchases = await Purchase.find().populate('supplier');
    id = ObjectId(req.params.id)
    const purchases = await Purchase.aggregate([
        {
            $match: {
              $expr: {
                $or: [
                  { $eq: ['$main_purchase', id] },
                  { $eq: ['$_id', id ] },

                ]
              }
            }
        },
        {
            $lookup:{
                from: 'suppliers',
                localField: 'supplier',
                foreignField: '_id',
                as: 'supplier'
            }
        },
        {
             $unwind:{ 
                path: '$supplier',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $sort: { 'created_at' : 1}
        }
     ]);

    if(purchases){
        return res.status(200).send(purchases)
    }else{
        return res.status(500).send('error getting purchases')
    }
})


router.get('/type/:type', async (req, res)=>{
    let type = req.params.type
    let d = new Date(Date.now())
    let order = 1;
    let prefix = ""
    if(type == "preparation de commande"){
        prefix = "PREP"
    }else if(type == "bon de commande"){
        prefix = "BC"
    }else if(type == "bon de livraison"){
        prefix = "BL"
    }else if(type == "facture d'achat"){
        prefix = "FA"
    }
    const purchase = await Purchase.findOne({type: type, date: {$lte: d}}).sort({order: -1}).limit(1)
    if(purchase){
        if(purchase.date.getFullYear() == d.getFullYear()){
            order = purchase.order +1
        }else{
            order = 1
        }
        return res.status(200).send({ref: prefix + zeroPad(order, 4), order: order, _id: purchase._id})
    }else{
        return res.status(200).send({ref: prefix + zeroPad(order, 4), order: order})
    }
})

router.get('/:id', async (req, res)=>{
    const purchase = await Purchase.findById(req.params.id);

    if(purchase){
        return res.status(200).send(purchase)
    }else{
        return res.status(500).send('error getting purchase by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
   console.log(req.params.id)
    const purchases = await Purchase.aggregate([
        {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$next_purchase', null] },
                  { $eq: ['$supplier', ObjectId(req.params.id) ] },
                ]
              }
            }
        },
        {
            $sort: { 'date' : -1}
        }
     ]);

    if(purchases){
        return res.status(200).send(purchases)
    }else{
        return res.status(500).send('error getting purchases')
    }
})

router.get('/unpaid-supplier/:id', async (req, res)=>{
    console.log(req.params.id)
     const purchases = await Purchase.aggregate([
         {
             $match: {
               $expr: {
                 $and: [
                   { $eq: ['$next_purchase', null] },
                   { $ne: ['$type', 'bon de commande'] },
                   { $ne: ['$type', 'preparation de commande'] },
                   { $eq: ['$supplier', ObjectId(req.params.id) ] },
                 ]
               }
             }
         },
         {
             $lookup:{
                 from: 'payements',
                 localField: 'main_purchase',
                 foreignField: 'purchase',
                 as: 'payement'
             }

         },
         {
             $sort: { 'date' : -1}
         }
      ]);
 
     if(purchases){
         return res.status(200).send(purchases)
     }else{
         return res.status(500).send('error getting purchases')
     }
 })

router.post('/', async(req, res)=>{
    
    let purchase = new Purchase({
        created_at: Date.now(),
        type: req.body.type,
        date: req.body.date,
        ref: req.body.ref,
        delivery_date: req.body.delivery_date,
        status: req.body.status,
        order: req.body.order,
        supplier_ref: req.body.supplier_ref,
        supplier: req.body.supplier,
        total_ttc: req.body.total_ttc,
        total_ht: req.body.total_ht,
        total_tva: req.body.total_tva,
        total_timbre: req.body.total_timbre,
        total_discount: req.body.total_discount,
        supplier: req.body.supplier,
        total_other_taxes: req.body.total_other_taxes,
        tva_value: req.body.tva_value,
        timbre_value: req.body.timbre_value,
        discount_value: req.body.discount_value,
        other_taxes_value: req.body.other_taxes_value,
        tva_type: req.body.tva_type,
        timbre_type: req.body.timbre_type,
        discount_type: req.body.discount_type,
        other_taxes_type: req.body.other_taxes_type,
        items: req.body.items,
        supplier: req.body.supplier,
        payement_method: req.body.payement_method,
        main_purchase: setNull(req.body.main_purchase),
        previous_purchase: setNull(req.body.previous_purchase),
        next_purchase: setNull(req.body.next_purchase)
    })

     purchase = await purchase.save()

    if(purchase){
        if(purchase.previous_purchase){
    
            Purchase.findByIdAndUpdate(purchase.previous_purchase, {$set:{ next_purchase: purchase._id}}, {new: true}, (err, doc)=>{
                if(!err) return res.status(200).send(purchase)
                else console.log(err)
            })
            
        }else{
            return res.status(200).send(purchase)
        }
    
    }else{
        return res.status(500).send('error adding purchase')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const purchase = await Purchase.findByIdAndUpdate(req.params.id, {
        
        created_at: req.body.created_at,
        modified_at: Date.now(),
        type: req.body.type,
        date: req.body.date,
        ref: req.body.ref,
        delivery_date: req.body.delivery_date,
        status: req.body.status,
        order: req.body.order,
        supplier_ref: req.body.supplier_ref,
        supplier: req.body.supplier,
        total_ttc: req.body.total_ttc,
        total_ht: req.body.total_ht,
        total_tva: req.body.total_tva,
        total_timbre: req.body.total_timbre,
        total_discount: req.body.total_discount,
        supplier: req.body.supplier,
        total_other_taxes: req.body.total_other_taxes,
        tva_value: req.body.tva_value,
        timbre_value: req.body.timbre_value,
        discount_value: req.body.discount_value,
        other_taxes_value: req.body.other_taxes_value,
        tva_type: req.body.tva_type,
        timbre_type: req.body.timbre_type,
        discount_type: req.body.discount_type,
        other_taxes_type: req.body.other_taxes_type,
        payement_method: req.body.payement_method,
        items: req.body.items,
        supplier: req.body.supplier,
        main_purchase: setNull(req.body.main_purchase),
        previous_purchase: setNull(req.body.previous_purchase),
        next_purchase: setNull(req.body.next_purchase)
        
    }, { new: true});

    
    if(purchase){
        return res.status(200).send(purchase)
    }else{
        return res.status(500).send('error updating purchase')
    }

})


router.delete('/:id', (req, res)=>{

    Purchase.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Purchase supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet purchase: ', err})
        }

    })

})



module.exports = router;