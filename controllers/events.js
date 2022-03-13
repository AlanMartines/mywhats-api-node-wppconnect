const fs = require('fs-extra');
const mime = require('mime-types');
const webhooks = require('./webhooks.js');
const config = require('../config.global');
//
module.exports = class Events {


	static async receiveMessage(session, client, socket) {

		await client.onMessage(async message => {
			let type = message.type
			if (type == 'chat' && message.subtype == 'url') {
				type = 'link'
			} else if (type == 'chat' && !message.subtype) {
				type = 'text'
			}

			let response = []
			if (message.isMedia === true || message.isMMS === true || message.type == 'document' || message.type == 'ptt' || message.type == 'sticker') {
				var buffer = await client.decryptFile(message);
				var telefone = ((String(`${message.from}`).split('@')[0]).substr(2));
				let date_ob = new Date();
				let date = ("0" + date_ob.getDate()).slice(-2);
				let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
				let year = date_ob.getFullYear();
				let miliseconds = date_ob.getMilliseconds();
				var fileName = `${telefone}-${year}${month}${date}-${miliseconds}.${mime.extension(message.mimetype)}`;
			}
			//
			let contact = await client?.getContact(message?.id);
			//
			switch (type) {

				case 'text':
					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'text',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"content": message.body,
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;

				case 'image':

					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'image',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"content": message.body,
						"caption": message.caption != undefined ? message.caption : "",
						"file": fileName,
						"base64": await client?.downloadMedia(message?.id),
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;
				case 'sticker':
					fs.writeFileSync(`files-received/${fileName}`, buffer, (err) => {
						console.log('arquivo baixado!')
					});
					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'sticker',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"content": message.body,
						"caption": message.caption != undefined ? message.caption : "",
						"file": fileName,
						"base64": await client?.downloadMedia(message?.id),
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;

				case 'audio':

					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'audio',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"mimetype": message.mimetype,
						"file": fileName,
						"base64": await client?.downloadMedia(message?.id),
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}
					break;

				case 'ptt':

					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'ptt',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"mimetype": message.mimetype,
						"file": fileName,
						"base64": await client?.downloadMedia(message?.id),
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}
					break;

				case 'video':

					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'video',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"content": message.body,
						"caption": message.caption != undefined ? message.caption : "",
						"file": fileName,
						"base64": await client?.downloadMedia(message?.id),
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;

				case 'location':
					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'location',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"content": message.body,
						"loc": message.loc,
						"lat": message.lat,
						"lng": message.lng,
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;

				case 'document':
					fs.writeFileSync(`files-received/${fileName}`, buffer, (err) => {
						console.log('arquivo baixado!')
					});
					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'document',
						"id": message.id,
						"session": session,
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"mimetype": message.mimetype,
						"caption": message.caption != undefined ? message.caption : "",
						"file": fileName,
						"base64": await client?.downloadMedia(message?.id),
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;

				case 'link':
					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'link',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"thumbnail": message.thumbnail,
						"title": message.title,
						"description": message.description,
						"url": message.body,
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}
					break;

				case 'vcard':
					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'vcard',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"contactName": message.vcardFormattedName,
						"contactVcard": message.body,
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;

				case 'order':
					response = {
						"wook": 'RECEIVE_MESSAGE',
						"type": 'order',
						"id": message.id,
						"session": session,
						//
						"name": contact.name ? contact.name : "",
						"realName": contact.pushname ? contact.pushname : "",
						"formattedName": contact.formattedName ? contact.formattedName : "",
						"business": contact.isBusiness,
						"verifiedName": contact.verifiedName ? contact.verifiedName : "",
						"isMyContact": contact.isMyContact,
						//
						"isGroupMsg": message.isGroupMsg,
						"author": message.author ? message.author : null,
						"sender": message.to.split('@')[0],
						"phone": message.from.split('@')[0],
						"content": '',
						"status": "RECEIVED",
						"timestamp": message.timestamp,
					}

					break;
			}

			await webhooks.wh_messages(session, response)

		})
	}

	static statusMessage(session, client, socket) {

		client.onAck(async ack => {
			let type = ack.type
			if (type == 'chat' && ack.subtype == 'url') {
				type = 'link'
			} else if (type == 'chat' && !ack.subtype) {
				type = 'text'
			}
			let status
			switch (ack.ack) {
				case 0:
					status = 'CLOCK'

					break;

				case -3:
					status = 'CONTENT_GONE'

					break;
				case -4:
					status = 'CONTENT_TOO_BIG'

					break;

				case -5:

					status = 'CONTENT_UNUPLOADABLE'

					break;

				case -2:

					status = 'EXPIRED'

					break;
				case -1:

					status = 'FAILED'

					break;
				case -6:

					status = 'INACTIVE'

					break;
				case -7:

					status = 'MD_DOWNGRADE'

					break;
				case 4:

					status = 'PLAYED'

					break;
				case 3:

					status = 'READ'

					break;
				case 2:

					status = 'RECEIVED'

					break;
				case 1:

					status = 'SENT'

					break;
			}
			//
			let contact = await client?.getContact(ack.id._serialized);
			//
			let timestamp = Math.round(new Date().getTime() / 1000)
			let response = {
				"wook": 'MESSAGE_STATUS',
				"status": status,
				"id": ack.id._serialized,
				"session": session,
				//
				"name": contact.name ? contact.name : "",
				"realName": contact.pushname ? contact.pushname : "",
				"formattedName": contact.formattedName ? contact.formattedName : "",
				"business": contact.isBusiness,
				"verifiedName": contact.verifiedName ? contact.verifiedName : "",
				"isMyContact": contact.isMyContact,
				//
				"phone": ack.id.remote.split("@")[0],
				"content": ack.body,
				"timestamp": timestamp,
				"type": type
			}

			await webhooks.wh_status(session, response)

		});

	}

	static statusConnection(session, client) {

		client.onStateChange((state) => {
			console.log('State changed: ', state);
			// force whatsapp take over
			if ('CONFLICT'.includes(state)) client.useHere();
			// detect disconnect on whatsapp
			if ('UNPAIRED'.includes(state)) webhooks.wh_connect(session, 'disconnectedMobile');

		});

	}

}