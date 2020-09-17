var mailer = require('nodemailer');
var router = express.Router();
app.use('/sayHello', router);
router.post('/', sendEmail);

function sendEmail(req, res) {
    var transporter = mailer.createTransport({
        server: 'Gmail',
        auth: {
            user: 'accalert@gmail.com', 
            pass: 'Projectpassword12!'
        }
    })
}

var text = 'Testing \n\n' + req.body.name;
var mailOptions = {
    from: 'accalertapp@gmail.com',
    to: 'silelauriah@gmail.com', 
    subject: 'Accident Alert App', 
    text: text

}

transporter.sendEmail(mailOptions, function(error, info) {
    if(error) {
        console.log(error);
        res.json({yo: 'error'});
    }else {
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response})
    }
})
