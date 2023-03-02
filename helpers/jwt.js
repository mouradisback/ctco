const expressJwt = require('express-jwt')

function AuthJwt(){
    const secret = process.env.SECRET_KEY
    const api_url = process.env.API_URL
    return expressJwt(
        {
            secret: secret,
            algorithms: ['HS256'],
            isRevoked: isRevoked
        }
    ).unless({
        path:[
            api_url+'/users/login',
            /\/*/
        ]
    })
}

async function isRevoked(req, payload, done){
    
    const perm = req.originalUrl.split('/')
    console.log(perm[2])
    if(payload.permissions.includes('admin') || payload.permissions.includes(perm[2])){
        done();
    }
    done(null, true)
    
}

module.exports = AuthJwt;