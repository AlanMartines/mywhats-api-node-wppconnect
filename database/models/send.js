/* ##############################################################################
# File: send.js                                                                #
# Project: api-monitoring                                                      #
# Created Date: 2022-01-10 14:30:58                                            #
# Author: Eduardo Policarpo                                                    #
# Last Modified: 2022-01-10 14:30:59                                           #
# Modified By: Eduardo Policarpo                                               #
############################################################################## */

import Sequelize from 'sequelize';
import connection from '../database.js';

const Send = connection.define(
  'Send',
  {
    id_send: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    wook: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fromMe: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    id: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    session: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    isGroupMsg: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    author: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    to: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    from: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      allowNull: true,
      type: Sequelize.TEXT('medium'),
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    caption: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    datetime: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    base64: {
      allowNull: true,
      type: Sequelize.TEXT('long'),
    },
    mimetype: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    loc: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    lat: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    lng: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    thumbnail: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    title: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    url: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    contactName: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    contactVcard: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    tableName: 'Send',
  }
);

// force: true faz com que a tabela seja criada ou atualizada no BD
Send.sync({ force: false })
  .then(() => {
    console.log('tabela Send criada/atualizada com sucesso no BD');
  })
  .catch((error) => {
    console.log('erro ao sincronizar a tabela Send no BD', error);
  });


export default Send;
