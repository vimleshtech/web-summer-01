var express = require('express');  //load/import the library 
var mysql = require('mysql');

var nodemailer = require("nodemailer");


nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "vimlesh073@gmail.com", // generated ethereal user
                pass: "xdveivstcehxdcza" // generated ethereal password
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: 'vimlesh073@gmail.com', // sender address
            to: 'nsnitisha@gmail.com,jyotisharma022@gmail.com', // list of receivers
            subject: 'Test from node - Hello ✔', // Subject line
            text: 'Hello world? ', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });

    
//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'sales'
});

connection.connect(function(err) {
    if (err) throw err;
});


var app = express();	//create object of express class

app.get('/',function(req,res){
		res.send('hi');
});

app.get('/todos',function(req,re){

    connection.query("select * from product", function(err,res){

            if(err){
                    console.log(err);
            }
            else{
                    console.log(res);
                    
            re.send(res);

            }
    });

    
})

app.get('/delproduct',function(req,re){

    connection.query("delete  from product", function(err,res){

            if(err){
                    console.log(err);
            }
            else{
                    console.log(res);
                    
            re.send(res);

            }
    });

    
})


app.get('/products',function(req,res){

    res.json([{pid:1,pname:'dove'},{pid:2,pname:'iphone'}]);

})


app.listen(3011,function(){
			console.log('you can access service at 3011 port ');	
})	
