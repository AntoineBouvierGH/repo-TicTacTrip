const fs = require('fs');
const TokenGenerator = require('uuid-token-generator');

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

exports.getTheToken = (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({err: "Paramètre manquant"});
    }
    if (validateEmail(req.body.email) === false) {
        return res.status(401).json({err: "bad email format"});
    }
    let rawdata = fs.readFileSync('./storageFiles/users.json');
    let users = JSON.parse(rawdata);
    var valueToReturn = undefined;
    var userEmail = req.body.email;
    var i = 0;
    var aUserWasFounded = false;

    // search for corresponding user
    for (i = 0; i < users.length; i++) {
        if (users[i].email === userEmail) {
            valueToReturn = users[i].token;
            aUserWasFounded = true;
        }
    }
    // create new user
    if (aUserWasFounded === false) {
        let now = +new Date();
        console.log(now.toString());
        var newToken = new TokenGenerator(256, TokenGenerator.BASE62);
        users.push({
            email: req.body.email,
            token: newToken.generate(),
            creationdate: now,
            wordsLeft: 80000
        })
        valueToReturn = users[users.length - 1].token;
    }


    fs.writeFileSync('./storageFiles/users.json', JSON.stringify(users));
    return res.status(200).json(valueToReturn);
}