function errorHandler(err, req, res, next){
    if(err){
        return res.status(500).send(err)
    }else{
        next()
    }

    return res.status(500).send(err)
}

module.exports = errorHandler;