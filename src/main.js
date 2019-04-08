const Command = require('./command');
const { Message, OpType, Location, Profile } = require('../curve-thrift/line_types');

class LINE extends Command {
    constructor() {
        super();
        this.stateStatus = {
            cancel: 1,
            kick: 1,
        };
        this.messages;
        this.payload;
    }


    get myBot() {
        const bot = ['u28d781fa3ba9783fd5144390352b0c24', 'uc7ef4ddc03758fbe5b0091af55ecba11', 'u787d6464e208dad899bdc1f80eaf9284'];//['u1a0c94d418512e2da2068ec59b3286f8','uc37819fe880be991c9a0fdb60a9fa78e','ud4d2c8cbf1429842fc2f65e7f044647c','u13dbe0afc7bdfeabc6cfe604c3184c21','u38f9f54eb878169aff22659cb165eb4e','uefed6d7781f71a0c7ebc74a0bd9b9598','uc7ef4ddc03758fbe5b0091af55ecba11','u5a18b6eb89fe189e2ff801de62038e22','u65094373cb71affadf616b3551ee3b67','udba4c41c848a6671327954e23282b22c','ucc81c48aba1576d3411d9a64a5fa58ce','ue5d39236e35a615c1e9314e1549e5606','ubd50a678b2a2fce8138c6bd87e1c5710','u7320b99838293ea617001efde1eb1969','ub1e4b4d28b9fd5bd15b96faf321b79c7','udb01526fa926fd149aa60126f9562111','uc04580871ff911ca9c55b866836a05c9','u28d781fa3ba9783fd5144390352b0c24'];
        return bot; 
    }

    isAdminOrBot(param) {
        return this.myBot.includes(param);
    }

    getOprationType(operations) {
        for (let key in OpType) {
            if(operations.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operations.type} ] ${key} `);
                }
            }
        }
    }

    poll(operation) {
        if(operation.type == 25 || operation.type == 26) {
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === this.myBot[0]) ? operation.message._from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            this.textMessage(message)
        }
        if(operation.type == 9 || operation.type == 12) {
            return this._leaveGroup(operation.param1);
        }
        if(operation.type == 13) {
            this._acceptGroupInvitation(operation.param1);
            return this.new_sendMessage(operation.param1, "owo")
        }
        //if(operation.type == 16) {
        //    return this.sendMessage(operation.param1, "owo");
        //}
        this.getOprationType(operation);
    }

    command(msg, reply) {
        if(this.messages.text !== null) {
            if(this.messages.text === msg.trim()) {
                if(typeof reply === 'function') {
                    reply();
                    return;
                }
                if(Array.isArray(reply)) {
                    reply.map((v) => {
                        this._sendMessage(this.messages, v);
                    })
                    return;
                }
                return this._sendMessage(this.messages, reply);
            }
        }
    }

    async textMessage(messages) {
        this.messages = messages;
        let payload = (this.messages.text !== null) ? this.messages.text.split(' ').splice(1).join(' ') : '' ;
        let receiver = messages.to;
        let sender = messages.from;
        this.command("owo", this.Kick.bind(this));
        this.command('可撥蛋蛋邀機您', this.spamGroup.bind(this));


    }

}

module.exports = LINE;
