const {CustomApiError} = require('../error/custom-error');

const errorHanlderMiddleware = (err, req, res, next) =>{
 
    if(err instanceof CustomApiError) {
        return  res.status(err.statusCode).json({msg: err.message})   // this is my custom api error class
    }
   
    // return res.status(500).json({msg : 'something went wrong, please try again later..'});
    return res.status(500).json({msg : err.message});
}

module.exports = errorHanlderMiddleware;