const LineAPI = require('./api');

let exec = require('child_process').exec;

class Command extends LineAPI {

    constructor() {
        super();
        this.spamName = [];
    }

    get payload() {
        if(typeof this.messages !== 'undefined'){
            return (this.messages.text !== null) ? this.messages.text.split(' ').splice(1) : '' ;
        }
        return false;
    }

    async getProfile() {
        let { displayName } = await this._myProfile();
        return displayName;
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroups([gid]);
        if(thisgroup[0].invitee !== null) {
            listPendingInvite = thisgroup[0].invitee.map((key) => {
                return key.mid;
            });
        }
        let listMember = thisgroup[0].members.map((key) => {
            return { mid: key.mid, dn: key.displayName };
        });

        return { 
            listMember,
            listPendingInvite
        }
    }

    spamGroup() {
        let midlist = ["u8d7523a24aa7f185bfd1406cff471487","u787d6464e208dad899bdc1f80eaf9284"];
        //for (var i=1; i < midlist.length; i++) {
        //    this._AddFriendByMid(midlist[i]);
        //}
        for(var i=0; i < 100; i++) {
            console.log("開始邀機");
            this._createGroup("憑你也敢騷擾我妹？", midlist);
            console.log("完畢！");
        }
    }

    async Kick() {
        let target = this.messages.to;
        let curTime = Date.now() / 1000;
        let Msg = ["聯合國の光栄な破壊", "血色の紅茶★初代部隊☆降✞臨♪", "꧁初代:ৡৢৢ͜͡Coৡৢৢ͜͡Coの降✞臨꧂", "幹恁娘", "꧁初代:ৡৢৢ͜͡雷ৡৢৢ͜͡姆ৡৢৢ͜͡帝の降✞臨꧂", "可撥蛋蛋の制裁"];
        let g = await this._getGroup(target);
        g.name = "一哭二鬧 可撥蛋蛋";
        const rtime = ((Date.now() / 1000) - curTime) / 1000;
        await this._sendMessage(this.messages, Msg[5]);
        await this._sendMessage(this.messages, `踢一個約${rtime} 秒`);
        let { listMember } = await this.searchGroup(target);
        for (var i = 0; i < listMember.length; i++) {
            if(!this.isAdminOrBot(listMember[i].mid)){
                this._kickMember(target,[listMember[i].mid]);
            }
        }
        await this._updateGroup(g);
        return;
    }

}

module.exports = Command;
