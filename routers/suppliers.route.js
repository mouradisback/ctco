const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const {Supplier} = require('../models/Supplier')

router.get('/', async (req, res)=>{

    await Supplier.find().exec((err, suppliers)=>{
        if(!err){
            res.status(201).json(suppliers)
        }else{
            res.status(500).json({success: false, error: err})
        }
    });

})

router.get('/last-order', async(req, res)=>{
    let order = 1
    let ref = ''
    let supplier = await Supplier.findOne().sort({order: -1})

    if(supplier){
        if(supplier.order) {
            order = supplier.order + 1
        }
        else{
            order = 1
        } 
    }

    ref = 'F'+zeroPad(order, 4)
    return res.status(200).send({order: order, ref: ref})
})

router.get('/:id', async(req, res)=>{
    let supplier = await Supplier.findById(req.params.id)
    if(supplier){
        return res.status(200).send(supplier)
    }else{
        return res.status(500).send()
    }
})



router.post('/', async (req, res)=>{

    let supplier = new Supplier({
        name: req.body.name,
        created_at: Date.now(),
        account_ref: req.body.account_ref, 
        order: req.body.order, 
        address: req.body.address,
        business_area: req.body.business_area,
        tel: req.body.tel,
        website: req.body.website,
        email: req.body.email,
        bank_name: req.body.bank_name,
        bank_account_no: req.body.bank_account_no,
        rc: req.body.rc,
        nif: req.body.nif,
        nis: req.body.nis,
        ai: req.body.ai
    });
    
    

    try{
        supplier = await  supplier.save()
        return res.status(200).send(supplier)
    } catch (error){
        console.log(error)
        if(error.code == '11000'){
            return res.status(400).send({message: "valeur exist deja"});
        }else{
            return res.status(500).send(error);
        }
    }
    
})

router.put('/:id', async (req, res)=>{

    try{

        const supplier = await Supplier.findByIdAndUpdate(req.params.id, {
        
            name: req.body.name,
            created_at: req.body.created_at,
            modified_at: Date.now(),
            account_ref: req.body.account_ref, 
            order: req.body.order, 
            address: req.body.address,
            business_area: req.body.business_area,
            tel: req.body.tel,
            email: req.body.email,
            website: req.body.website,
            bank_name: req.body.bank_name,
            bank_account_no: req.body.bank_account_no,
            rc: req.body.rc,
            nif: req.body.nif,
            nis: req.body.nis,
            ai: req.body.ai
        
    }, { new: true});
    return res.status(200).send(supplier)
        
    } catch (error){
        console.log(error)
        if(error.code == '11000'){
            return res.status(400).send({message: "valeur exist deja"});
        }else{
            return res.status(500).send(error);
        }
    }

})

router.delete('/:id', (req, res)=>{
    Supplier.findByIdAndDelete(req.params.id).then(supplier =>{
        if(supplier){
            res.status(201).json({success: true, supplier: supplier})
        }else{
            return res.status(404).json({success: false, error: 'supplier not found'})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})

const zeroPad = (num, places) => String(num).padStart(places, '0')
function setNull(value){
    if(value) {return value} else {return null}
}


module.exports = router