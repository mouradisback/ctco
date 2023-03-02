const {Pricelist} = require('../models/Pricelist')
const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var multer  = require('multer');

const zeroPad = (num, places) => String(num).padStart(places, '0')
function setNull(value){
    if(value) {return value} else {return null}
}

router.get('/', async (req, res)=>{
    //const purchases = await Purchase.find().populate('supplier');
    const pricelist = await Pricelist.aggregate([
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
            $sort: { 'date' : -1}
        }
     ]);

    if(pricelist){
        return res.status(200).send(pricelist)
    }else{
        return res.status(500).send('error getting pricelist')
    }
})

router.get('/itemlist', async (req, res)=>{
    //const purchases = await Purchase.find().populate('supplier');
    const pricelist = await Pricelist.aggregate([
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
            $sort: { 'date' : -1}
        },
        {
            $unwind:{ 
               path: '$items'
           }
        },
       
     ]);

    if(pricelist){
        return res.status(200).send(pricelist)
    }else{
        return res.status(500).send('error getting pricelist')
    }
})



router.get('/:id', async (req, res)=>{
    const pricelist = await Pricelist.findById(req.params.id);

    if(pricelist){
        return res.status(200).send(pricelist)
    }else{
        return res.status(500).send('error getting pricelist by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
   
    const pricelist = await Pricelist.aggregate([
        {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$supplier', ObjectId(req.params.id) ] },
                ]
              }
            }
        },
        {
            $sort: { 'date' : -1}
        }
     ]);

    if(pricelist){
        return res.status(200).send(pricelist)
    }else{
        return res.status(500).send('error getting pricelist')
    }
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/price-list');
    },
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      else{
        filetype = 'pdf';
      }
      cb(null, 'proforma-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});



router.post('/', upload.single('file'), async(req, res)=>{

    
   
    if(!req.file){
console.log('no file recieved')
    }
    else{

    let pricelist = new Pricelist({
        created_at: Date.now(),
        type: req.body.type,
        date: req.body.date,
        ref: req.body.ref,
        status: req.body.status,
        order: req.body.order,
        supplier_ref: req.body.supplier_ref,
        supplier: req.body.supplier,
        items: JSON.parse(req.body.items),
        attached_file_url: req.file.filename,
        price_validity: req.body.price_validity
       
    })

    pricelist = await pricelist.save()

    if(pricelist){
      
            return res.status(200).send(pricelist)
        
    
    }else{
        return res.status(500).send('error adding pricelist')
    }

}


})


 
router.put('/:id', async(req, res)=>{

    
    const pricelist = await Pricelist.findByIdAndUpdate(req.params.id, {
        
        created_at: req.body.created_at,
        modified_at: Date.now(),
        type: req.body.type,
        date: req.body.date,
        ref: req.body.ref,
        status: req.body.status,
        order: req.body.order,
        supplier_ref: req.body.supplier_ref,
        supplier: req.body.supplier,
        items: req.body.items,
        price_validity: req.body.price_validity
        
    }, { new: true});

    
    if(pricelist){
        return res.status(200).send(pricelist)
    }else{
        return res.status(500).send('error updating pricelist')
    }

})


router.delete('/:id', (req, res)=>{

    Pricelist.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'pricelist supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet pricelist: ', err})
        }

    })

})



module.exports = router;