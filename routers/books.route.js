const {Book} = require('../models/Book')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res)=>{
    const books = await Book.find()
        
    if(books){
        return res.status(200).send(books)
    }else{
        return res.status(500).send('error getting books')
    }
})

router.get('/:id', async (req, res)=>{
    const book = await Book.findById(req.params.id);

    if(book){
        return res.status(200).send(book)
    }else{
        return res.status(500).send('error getting book by id')
    }
})

router.get('/supplier/:id', async (req, res)=>{
    const books = await Book.find({supplier: req.params.id});

    if(books){
        return res.status(200).send(books)
    }else{
        return res.status(500).send('error getting book by id')
    }
})

router.post('/', async(req, res)=>{

    let book = new Book({

        created_at: Date.now(),
        modified_at: req.body.modified_at,
        title: req.body.title,
        series: req.body.series,
        sub_title: req.body.sub_title,
        author: req.body.author,
        image_url_front: req.body.image_url_front,
        image_url_back: req.body.image_url_back,
        isbn: req.body.isbn,
        published_year: req.body.published_year,
        publisher: req.body.publisher,
        description: req.body.description
        
    })

     book = await book.save()

    if(book){
        return res.status(200).send(book)
    }else{
        return res.status(500).send('error adding book')
    }

})


 
router.put('/:id', async(req, res)=>{

    
    const book = await Book.findByIdAndUpdate(req.params.id, {

        created_at: req.body.created_at,
        modified_at: Date.now(),
        title: req.body.title,
        series: req.body.series,
        sub_title: req.body.sub_title,
        author: req.body.author,
        image_url_front: req.body.image_url_front,
        image_url_back: req.body.image_url_back,
        isbn: req.body.isbn,
        published_year: req.body.published_year,
        publisher: req.body.publisher,
        description: req.body.description
        

    }, { new: true});

    
    if(book){
        return res.status(200).send(book)
    }else{
        return res.status(500).send('error updating book')
    }

})

router.delete('/:id', (req, res)=>{

    Book.findByIdAndDelete(req.params.id,{}, (err, doc)=>{
        if(!err){
            res.status(200).send({message: 'Book supprimer avec success'})
        }else{
            res.status(500).send({message: 'could not delet book: ', err})
        }

    })

})



module.exports = router;