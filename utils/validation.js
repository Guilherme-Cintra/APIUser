import Joi from "joi"

const userSchema = Joi.object({
    name :Joi.string().required(),
    email : Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')).required(),
    accountDate : Joi.date().default(() => new Date())
})

export default userSchema ;