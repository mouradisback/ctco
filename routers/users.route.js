const {User} = require('../models/User')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res)=>{
    const users = await User.find().populate('employee').select('-passwordHash');

    if(users){
        return res.status(200).send(users)
    }else{
        return res.status(500).send('error getting users')
    }
})

router.post('/register', async(req, res)=>{

    let user = new User({
        username: req.body.username,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        permissions: req.body.permissions,
        employee: req.body.employee
    })

     user = await user.save()

    if(user){
        return res.status(200).send(user)
    }else{
        return res.status(500).send('error adding user')
    }

})

router.post('/login', async(req, res)=>{

    const userExist = await  User.findOne({username: req.body.username})
 
     if(!userExist){
         return res.status(404).send({message: 'Utilisateur introuvable !'})
     }else{
         if(bcrypt.compareSync(req.body.password, userExist.passwordHash)){
             const secret = process.env.SECRET_KEY
             const token = jwt.sign(
                 {user_id: userExist._id, permissions: userExist.permissions}, secret, {expiresIn: '1d'}
                 )
            return res.status(200).send({message: "Authentification reussi",user: userExist, token: token})
         }else{
            return res.status(404).send({message: 'Mot de pass ou nom d\'utilisateur incorrect'})
         }
     }
 
 })
 
router.put('/:id', async(req, res)=>{

    const userExist = await User.findById(req.params.id)
  
    const user = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        permissions: req.body.permissions,
        employee: req.body.employee

    }, { new: true});

    
    if(user){
        return res.status(200).send(user)
    }else{
        return res.status(500).send('error updating user')
    }

})

router.put('/password/:id', async(req, res)=>{

    const userExist = await User.findById(req.params.id)
    let password = ''

    if(req.body.password){
        password = bcrypt.hashSync(req.body.password, 10)
    }else{
        password = userExist.passwordHash;

    }

    console.log(req.body)

    const user = await User.findByIdAndUpdate(req.params.id, {
        
        passwordHash: password,
        

    }, { new: true});

    
    if(user){
        return res.status(200).send(user)
    }else{
        return res.status(500).send('error updating user')
    }

})

router.delete('/:id', async(req, res)=>{

    const userExist = await User.findById(req.params.id)
    
    if(userExist){
        User.findByIdAndDelete(userExist._id, (err, doc)=>{
            if(!err){
                return res.status(200).send(doc)
            }else{
                return res.status(500).send('error deleting user', err)
            }
        })
    }
  

})



module.exports = router;