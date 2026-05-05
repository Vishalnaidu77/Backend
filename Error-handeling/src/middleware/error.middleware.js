import dotenv from 'dotenv/config'

const handleError = (err, req, res, next) => {     
    
    const response = {
        error: err.message
    }

    if(process.env.NODE_ENV === 'development'){
        response.stack = err.stack
    }

    res.status(err.status).json({
        response
    })
}

export default handleError;