const fs = require('fs');

function getWordsNumber(text) {
    var tab = text.split(' ');

    return tab.length;
}

function getJustifiedText(text) {
    var i = 0;
    var c = 0;
    var newText = "";

    while (i < text.length) {
        newText += text[i];
        i++;
        c++;
        if (c == 80) {
            newText += '\n';
            c = 0;
        }
    }
    console.log(newText);
    return newText;
}

function checkDate(users, i, text, res) {
    var creation = users[i].creationdate;

    let now = +new Date();

    const oneDay = 60 * 60 * 24 * 1000;
    var compareDatesBoolean = (now - creation) > oneDay;

    // check if the token is 24hours old
    var l = getWordsNumber(text);
    if (compareDatesBoolean == true) {
        console.log("ok refueld");
        users[i].wordsLeft = 80000;
        users[i].creationdate = now;
    }

    // check if wordleft is suffisant
    if (l > users[i].wordsLeft) {
        return (res.status(400).json({err: "insuffisant words left"}));
    }
    var tmp = getJustifiedText(text);
    users[i].wordsLeft = users[i].wordsLeft - l;
    fs.writeFileSync('./storageFiles/users.json', JSON.stringify(users));
    return res.status(200).json({jusitiedText: tmp});
}

exports.justifyThisContent = (req, res) => {
    if (!req.body.token || !req.body.textToJustify) {
        return res.status(400).json({err: "Paramètre manquant"});
    }
    var i = 0;
    var founded = false;
    let rawdata = fs.readFileSync('./storageFiles/users.json');
    let users = JSON.parse(rawdata);


    for (i = 0; i < users.length; i++) {
        if (users[i].token === req.body.token) {
            if (users[i].wordsLeft <= 0) {
                return res.status(402).json({err:"Payment Required"});
            }
            founded = true;
            return checkDate(users, i, req.body.textToJustify, res);
        }
    }
    if (founded == false) {
        return res.status(404).json({err:"bad token"});
    }
    fs.writeFileSync('./storageFiles/users.json', JSON.stringify(users));
    return res.status(200).json("ca marche");
}