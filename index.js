const express = require('express');
const bodyPareser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer');

const app = express()

//engine
app.engine('handlebars', exphbs())
app.set('view engine', 'hbs')

//static
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('views', express.static(path.join(__dirname, 'views')))

//body pareser
app.use(bodyPareser.urlencoded({ extended: false }))
app.use(bodyPareser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/send', (req, res) => {
    // console.log(req.body)

    const output = `
    <p>You Have New Request</p>
    <h3>Hello from Node)</h3>
    <ul>
    <li>First Name: ${req.body.firstName}</li>
    <li>Last Name: ${req.body.lastName}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.firstName}</li>
    </ul>
    <h3>Message: </h3>
    <p>${req.body.notes}</p>
    `


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mailFrom@gmail.com', // generated ethereal user
            pass: 'pass' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = transporter.sendMail({
        from: '"Node app 👻" <mailFrom@gmail.com>', // sender address
        to: 'mailTo@gmail.com', // list of receivers
        subject: 'Hello from Node✔', // Subject line
        html: output // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.render('index', { msg: 'Message has been sended' })
})

app.listen(3000, () => { console.log('Server starting...') })