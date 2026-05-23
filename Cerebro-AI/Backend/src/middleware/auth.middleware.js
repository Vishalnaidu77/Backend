import jwt, { decode } from 'jsonwebtoken'

export async function verifyUser(req, res, next){
    try {
        const token = req.cookies.token
        
        if(!token){
            return res.status(404).json({
                message: "Token missing",
                success: false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decoded.id){
            return res.status(401).json({
                message: "Unauthorized token",
                success: false
            })
        }

        req.userId = decoded.id
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Unauthorized"
        })
    }
}