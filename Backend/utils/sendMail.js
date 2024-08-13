import hbs from 'nodemailer-express-handlebars'
import path from 'node:path'
import { transporter } from '../helpers/mail.js'

const handlebarOptions ={
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('../backend/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('../backend/views/'),
    extName: '.handlebars',
}

export const sendMail = async mailOptions => {
    transporter.use('compile', hbs(handlebarOptions))
    transporter.sendMail(mailOptions,(error, info) => {
        if (error){
            console.log(error)
        }
        console.log('Email sent: %s', info.messageId)
    })
}