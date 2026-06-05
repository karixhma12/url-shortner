const {z} = require("zod");

const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

const urlSchema = z.object({
    originalUrl : z.string().url({message : "Invalid url provided!"})
})

module.exports = {
    signupSchema,
    urlSchema
}

