import { NotFoundError } from '../helpers/error-handlers.js'
import { UserModel } from '../models/user.model.js'

export const findUser = async query => {
    const user = await UserModel.findOne(query);
    if(!user) throw new NotFoundError('Invalid Credentials')
        return user
} 


//findByEmail => query: { email:email}
//emailToken => query: { emailVerificationToken:token }
//passwordToken => query: { passwordVerificationToken:token }