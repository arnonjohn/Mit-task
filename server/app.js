var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    insecureAuth: true,
});

const nemail = require("nodemailer");

var port = process.env.PORT || 5000;

connection.connect(function (error) {
    if (error) {
        console.log("client problem with mysql" + error);
    } else {
        console.log("Client connected with database");
    }
})

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.listen(port, (err) => {
    if (err) {
        console.log("server not started" + err);
    } else {
        console.log("server started at http://localhost" + port);
    }

})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/userdata', function (req, res, next) {
    // Handle the get for this route
    var query = "select * from arun.t_txn_user";
    connection.query(query, function (err, rows) {
        if (err) {
            console.log("problem in fetching data from mysql" + err);
        } else {
            console.log("feteched sucess full" + rows)
            res.status(200).send({
                success: true,
                user: rows,
                messsage: 'fetched sucessfully'
            })
        }
    })
});

var mail = false;
app.post('/upload', function (req, res, next) {
    var uemail = "teamunicsol@gmail.com";
    var fil = JSON.stringify(req.body.file);
    var file = req.body.file;
    // console.log(file)
    for (i = 0; i < file.length; i++) {
        var firstname = (file[i].firstname);
        var lastname = (file[i].lastname);
        var phone = (file[i].phone);
        var email = (file[i].email);
        var state = (file[i].state);

        var query = `INSERT INTO  arun.t_txn_user   (firstname,lastname,phone,email,state) values (?,?,?,?,?) `;
        connection.query(query, [firstname, lastname, phone, email, state], function (error, rows) {
            if (error) {
                console.log("problem while inserting mysql" + error);
                if (error && !mail) {
                    senderror(uemail, fil);
                    this.mail = true;
                }

            } else {
                console.log("Inserted sucessfully" + rows)

            }
        })
    }
});



var nodemailer = nemail.createTransport({
    service: 'gmail',
    auth: {
        user: 'teamunicsol@gmail.com',
        pass: 'Koneqto@2018'
    },
    tls: { rejectUnauthorized: false }
});

function senderror(uemail, fil) {
    console.log(uemail)
    var body =
        '<p>There is some error while uploading the excel file .please check the record ' + fil + '</p>';
    let mailOptions = {
        from: nodemailer.nemail,
        to: uemail.trim(),
        subject: "Errormail",
        html: body,
    };
    nodemailer.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error("api sendmail..." + err.body);
        }
        else {
            console.log('Message sent: %s', info.messageId);
            console.log(info);
            console.log("Success...." + info);

        }
    });
}




