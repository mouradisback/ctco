const {Contact} = require('../models/Contact')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const contacts = await Contact.find();

    if(contacts){
        return res.status(200).send(contacts)
    }else{
        return res.status(500).send('error getting contacts')
    }
})

router.get('/:id', async (req, res)=>{
    const contact = await Contact.findById(req.params.id);

    if(contact){
        return res.status(200).send(contact)
    }else{
        return res.status(500).send('error getting contact by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const contacts = await Contact.find({supplier: req.params.id});

    if(contacts){
        return res.status(200).send(contacts)
    }else{
        return res.status(500).send('error getting contact by id')
    }
})

router.post('/', async(req, res)=>{

    let contact = new Contact({

        first_name: req.body.first_name,
        last_name: req.body.last_name,
        position: req.body.position,
        phone: req.body.phone,
        supplier: req.body.supplier,
        email: req.body.email
        
    })

     contact = await contact.save()

    if(contact){
        return res.status(200).send(contact)
    }else{
        return res.status(500).send('error adding contact')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const contact = await Contact.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        position: req.body.position,
        phone: req.body.phone,
        supplier: req.body.supplier,
        email: req.body.email
        

    }, { new: true});

    
    if(contact){
        return res.status(200).send(contact)
    }else{
        return res.status(500).send('error updating contact')
    }

})

router.delete('/:id', (req, res)=>{

    Contact.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Contact supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet contact: ', err})
        }

    })

})



module.exports = router;