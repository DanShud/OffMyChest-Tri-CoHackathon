module.exports = function(settings, waitRoom, runtimeConf) {
    
    var dk = require('descil-mturk')();

    var J = require('JSUS').JSUS;

    var node = waitRoom.node;
    var channel = waitRoom.channel;

////////////////////////////////////////////////////
  
    var counter = 1;

    var GROUP_SIZE = settings.GROUP_SIZE;
    var POOL_SIZE = settings.poolSize || GROUP_SIZE;

    var MAX_WAIT_TIME = settings.MAX_WAIT_TIME;

    var treatments = Object.keys(channel.gameInfo.settings);
    var tLen = treatments.length;

  ///////

    var timeOuts = {};

    var stager = new node.Stager();

    var ngc = require('nodegame-client');

  /////
    function decideTreatment(t) {
          debugger
          if (t === "treatment_rotate") {
              return treatmentName = treatments[(counter-1) % tLen];
          }
          else if ('undefined' === typeof t) {
            return treatmentName = treatments[J.randomInt(-1,tLen-1)];
          }
          return t;
    }

    function makeTimeOut(playerID) {
      var timeOutData = {
            over: "Time elapsed!!!",
            exit: 'AAA' // code.ExitCode
        };

        timeOuts[playerID] = setTimeout(function() {

            channel.sysLogger.log("Timeout has not been cleared!!!");
      node.say("TIME", playerID, timeOutData);
            }, settings.MAX_WAIT_TIME);

    }

    function clearTimeOut(playerID) {
        clearTimeout(timeOuts[playerID]);
        delete timeOuts[playerID];
    }

    function clientReconnects(p) {
        channel.sysLogger.log('Reconnection in the waiting room.', p);

        node.game.pl.each(function(player) {
            node.socket.send(node.msg.create({
                target: 'PCONNECT',
                data: p,
                to: player.id
            }));
        });

      node.socket.send(node.msg.create({
            target: 'PLIST',

¶      



