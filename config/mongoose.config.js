const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/frankensteinsMonster',
    { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => { console.log("We're in."); })
    .catch((err) => { console.log("CRITICAL ERROR - SYSTEM WILL SELF DESTRUCT. EXPLOSION IMMINENT,  PLEASE VACATE AREA. LIKE SERIOUSLY, YOU SHOULD PROBABLY STOP READING THIS AND GO. *boom*", err); });