import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'


const app = express()

app.use(passport.initialize())
app.use(morgan("dev"))

app.listen(8000, () => console.log("Server is running"))

app.get("/", (req, res) => {
    res.send("Jai Shree Ram")
})


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (_, __, profile, done) => {
    return done(null, profile)
}))

app.get("/auth/google", 
    passport.authenticate("google", { scope: ['profile', 'email']})
)

app.get("/auth/google/callback", 
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/"
    }),
    (req, res) => {
        console.log(req.user);
        res.send("Google authenticate successfull.")
    }
)