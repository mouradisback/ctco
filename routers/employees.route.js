const {Employee} = require('../models/Employee')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const employees = await Employee.aggregate([
        {
            $lookup:{
                from: "departements",
                localField: "departement",
                foreignField: "_id",
                as: "departement"
            }
        },
        {
            $unwind:{
                path: "$departement",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup:{
                from: "contracts",
                as: "contract",
                localField: "_id",
                foreignField: "employee",
                pipeline:[
                    
                    {
                        $lookup:{
                            from: "fonctions",
                            localField: "fonction",
                            foreignField: "_id",
                            as: "fonction"
                        }
                    },
                    {
                        $unwind:{
                            path: "$fonction",
                            preserveNullAndEmptyArrays: true
                        }
                    },


                ]
            }
        },
        { $addFields: { contract: { $last: "$contract" } } },
        { $addFields: { full_name: { $concat: ["$first_name", ' ', "$last_name"] } } }
    ]);

    if(employees){
        return res.status(200).send(employees)
    }else{
        return res.status(500).send('error getting employees')
    }
})

router.get('/:id', async (req, res)=>{
    const employee = await Employee.findById(req.params.id).populate('departement');

    if(employee){
        return res.status(200).send(employee)
    }else{
        return res.status(500).send('error getting employee by id')
    }
})

router.post('/', async(req, res)=>{


    let employee = new Employee({

        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        birth_place: req.body.birth_place,
        is_active: req.body.is_active,
        id_no: req.body.id_no,
        driver_licence_no: req.body.driver_licence_no,
        social_security_no: req.body.social_security_no,
        birth_certificate_no: req.body.birth_certificate_no,
        phone_personnal: req.body.phone_personnal,
        phone_professional: req.body.phone_professional,
        email: req.body.email,
        address: req.body.address,
        photo_path: req.body.photo_path,
        marital_status: req.body.marital_status,
        children_no: req.body.children_no,
        rib: req.body.rib,
        ccp: req.body.ccp,
        bank: req.body.bank,
        education: req.body.education,
        entry_date: req.body.entry_date,
        sortie_date: req.body.sortie_date,
        departement: req.body.departement
        
    })

     employee = await employee.save()

    if(employee){
        return res.status(200).send(employee)
    }else{
        return res.status(500).send('error adding employee')
    }

})


 
router.put('/:id', async(req, res)=>{

    console.log(req.params.id)
    const employee = await Employee.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        birth_place: req.body.birth_place,
        is_active: req.body.is_active,
        id_no: req.body.id_no,
        driver_licence_no: req.body.driver_licence_no,
        social_security_no: req.body.social_security_no,
        birth_certificate_no: req.body.birth_certificate_no,
        phone_personnal: req.body.phone_personnal,
        phone_professional: req.body.phone_professional,
        email: req.body.email,
        address: req.body.address,
        photo_path: req.body.photo_path,
        marital_status: req.body.marital_status,
        children_no: req.body.children_no,
        rib: req.body.rib,
        ccp: req.body.ccp,
        bank: req.body.bank,
        education: req.body.education,
        entry_date: req.body.entry_date,
        sortie_date: req.body.sortie_date,
        departement: req.body.departement
        

    }, { new: true});

    
    if(employee){
        return res.status(200).send(employee)
    }else{
        return res.status(500).send('error updating employee')
    }

})

router.delete('/:id', (req, res)=>{

    Employee.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Employee supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet employee: ', err})
        }

    })

})



module.exports = router;