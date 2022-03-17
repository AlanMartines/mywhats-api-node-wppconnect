const fs = require('fs-extra');
const {
  yo
} = require('yoo-hoo');
//
const config = require('./config.global');
//
yo('My-WhatsApp', {
  color: 'rainbow',
  spacing: 1,
});
//
// ------------------------------------------------------------------------------------------------//
//
fs.access("./config.global.js", fs.constants.F_OK, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.error('- Arquivo ".env');
      var modelo = `
NODE_EN=production
#
# Defina o HOST aqui caso voce utilize uma VPS deve ser colocado o IP da VPS
# Exemplos:
# HOST=204.202.54.2 => IP da VPS, caso esteja usando virtualização via hospedagem
# HOST=10.0.0.10 => IP da VM, caso esteja usando virtualização
# HOST=localhost => caso esteja usando na sua proprima maquina local
HOST=localhost
#
# Defina o numero da porta a ser usada pela API.
PORT=9001
#
# Define se o qrcode vai ser mostrado no terminal
VIEW_QRCODE_TERMINAL=0
#
# Device name
DEVICE_NAME='My Whatsapp'
#
# Auto close
AUTO_CLOSE=60000
#
# Chave de segurança para validação no JWT
JWT_SECRET=09f26e402586e2faa8da4c98a35f1b20d6b033c60
#
# Validate in terminal false or true
VALIDATE_MYSQL=0
#
# O host do banco. Ex: localhost
MYSQL_HOST=localhost
#
# Port do banco. Ex: 3306
MYSQL_PORT=3306
#
# Um usuário do banco. Ex: user
MYSQL_USER=mywhatsappapi
#
# A senha do usuário do banco. Ex: user123
MYSQL_PASSWORD=TuUep8KkjCtAA@
#
# A base de dados a qual a aplicação irá se conectar. Ex: node_mysql
MYSQL_DATABASE=mywhatsapp-api
#
# Gag image
TAG=1.0.0
#
# browserWSEndpoint Ex.: ws://127.0.0.1:3000
BROWSER_WSENDPOINT=
#
# Set name instace for use ecosystem.config.js
NAME_INSTANCES=ApiWPPConnectClus
#
# Set count instace for use ecosystem.config.js
INSTANCES=1
`;
      console.log("- Modelo do arquivo de configuração:\n", modelo);
      process.exit(1);
    } else {
      //
      // ------------------------------------------------------------------------------------------------//
      //
      const customExpress = require('./config/custom-express');
      const http = customExpress();
      const conn = require('./config/dbConnection').promise();
      const Sessions = require("./sessions.js");
      //
      // ------------------------------------------------------------------------------------------------//
      //
      http.listen(config.PORT, config.HOST, function(err) {
        if (err) {
          console.log(err);
        } else {
          const host = http.address().address;
          const port = http.address().port;
          console.log(`- HTTP Server running on: ${host}:${port}`);
        }
      });
      //
      // ------------------------------------------------------------------------------------------------//
      //
    }
  } else {
    //
    // ------------------------------------------------------------------------------------------------//
    //
    const customExpress = require('./config/custom-express');
    const http = customExpress();
    const Sessions = require("./sessions.js");
    //
    // ------------------------------------------------------------------------------------------------//
    //
    http.listen(config.PORT, config.HOST, function(err) {
      if (err) {
        console.log(err);
      } else {
        const host = http.address().address;
        const port = http.address().port;
        console.log(`- HTTP Server running on: ${host}:${port}`);
      }
    });
    //
    // ------------------------------------------------------------------------------------------------//
    //
  }
});
//
process.stdin.resume(); //so the program will not close instantly
//
async function exitHandler(options, exitCode) {
  if (options.cleanup) {
    console.log("- Cleanup");
    await Sessions.getSessions().forEach(async session => {
      await Sessions.closeSession(session.sessionName);
    });
  }
  if (exitCode || exitCode === 0) {
    console.log(exitCode);
  }
  //
  if (options.exit) {
    process.exit();
  }
} //exitHandler
//
// ------------------------------------------------------------------------------------------------//
//
//do something when sistema is closing
process.on('exit', exitHandler.bind(null, {
  cleanup: true
}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {
  exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
  exit: true
}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}));
//
// ------------------------------------------------------------------------------------------------//
//