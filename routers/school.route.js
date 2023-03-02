const {School} = require('../models/School')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const schools = await School.find();

    if(schools){
        return res.status(200).send(schools[0])
    }else{
        return res.status(500).send('error getting schools')
    }
})

router.get('/:id', async (req, res)=>{
    const school = await School.findById(req.params.id).populate('departement');

    if(school){
        return res.status(200).send(school)
    }else{
        return res.status(500).send('error getting school by id')
    }
})

router.post('/', async(req, res)=>{
    console.log(req.body)

    let school = new School({

        date_activity_start: req.body.date_activity_start,
        name: req.body.name,
        slogan: req.body.slogan,
        agreement_no: req.body.agreement_no,
        address: req.body.address,
        tel_mobile: req.body.tel_mobile,
        tel_landline: req.body.tel_landline,
        tel_fax: req.body.tel_fax,
        website: req.body.website,
        email: req.body.email,
        bank_name: req.body.bank_name,
        bank_account_no: req.body.bank_account_no,
        rc: req.body.rc,
        nif: req.body.nif,
        nis: req.body.nis,
        ai: req.body.ai
    })

     school = await school.save()

    if(school){
        return res.status(200).send(school)
    }else{
        return res.status(500).send('error adding school')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const school = await School.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        modified_at: Date.now(),
        date_activity_start: req.body.date_activity_start,
        name: req.body.name,
        slogan: req.body.slogan,
        agreement_no: req.body.agreement_no,
        address: req.body.address,
        tel_mobile: req.body.tel_mobile,
        tel_landline: req.body.tel_landline,
        tel_fax: req.body.tel_fax,
        website: req.body.website,
        email: req.body.email,
        bank_name: req.body.bank_name,
        bank_account_no: req.body.bank_account_no,
        rc: req.body.rc,
        nif: req.body.nif,
        nis: req.body.nis,
        ai: req.body.ai
        

    }, { new: true});

    
    if(school){
        return res.status(200).send(school)
    }else{
        return res.status(500).send('error updating school')
    }

})

router.delete('/:id', (req, res)=>{

    School.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'School supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet school: ', err})
        }

    })

})



module.exports = router;