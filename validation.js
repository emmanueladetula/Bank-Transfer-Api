const Joi=require('joi')

const createAccount=(data)=>{
    const schema=Joi.object({
        balance: Joi.number().required(),
    })
    return schema.validate(data)
}
module.exports.createAccount=createAccount;