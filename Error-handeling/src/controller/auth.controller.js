export async function registerController(req, res, next) {

    const { username, email, password } = req.body

    res.status(200).json({
        message: "User register successfully",
        username,
        email
    })
}