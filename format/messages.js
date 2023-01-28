const moment = require('moment');     

function formatMessage(user, text){
    return{
        user, text, time: moment().format('hh:mm')
    };
}

module.exports = formatMessage;