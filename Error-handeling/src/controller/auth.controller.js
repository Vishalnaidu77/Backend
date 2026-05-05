export async function registerController(req, res, next) {
    const user = req.body
    try {
        res.status(200).json({
            user
        })
    } catch (err) {
        err.status = 409
        next(err)
    }
}