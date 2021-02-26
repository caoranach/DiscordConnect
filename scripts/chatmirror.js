console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
    game.settings.register('DiscordConnect', 'mainUserId', {
        name: "Main GM ID",
        hint: "If you plan on having two GMs in one session, fill this in with the main DM's ID to avoid duplicated messages. Just type 'dc getID' in chat to have your ID sent to your discord channel.",
        scope: "world",
        config: true,
        default: "",
        type: String
    });
    game.settings.register('DiscordConnect', 'inviteURL', {
        name: "Game Invite URL",
        hint: "This should be the internet invite URL for your game session. Duh.",
        scope: "world",
        config: true,
        default: "http://",
        type: String
    });
	game.settings.register('DiscordConnect', 'webHookURL', {
        name: "Web Hook URL",
        hint: "This should be the Webhook's URL from the discord server you want to send messages to.",
        scope: "world",
        config: true,
        default: "http://",
        type: String
    });
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
});


Hooks.on('createChatMessage', (msg, options, userId) => {
	if(!game.user.isGM){
		return;
	}
	if(game.userId != game.settings.get("DiscordConnect", "mainUserId") && game.settings.get("DiscordConnect", "mainUserId") != ""){
		return;
	}
	var constructedMessage = '';
	var hookEmbed = [];
	
	if(msg.data.content == "dc getID"){
		sendMessage(msg, "UserId: "+game.userId, hookEmbed);
		return;
	}
	
	if(msg.isRoll){
		var title = '';
		var desc = '';
		if(msg.data.flavor != null && msg.data.flavor.length > 0){
			title = msg.data.flavor + '\n';
		}
		desc = desc + 'Rolled ' + msg.roll.formula + ', and got a ' + msg.roll.result + ' = ' + msg.roll.total;
		hookEmbed = [{title: title, description: desc}];
	}
	else if(!msg.data.content.includes("</div>")){
		constructedMessage = '\"' + msg.data.content + '\"';
	}
	else {
		var ids = msg.data.content.search("midi-qol-target-name");
		if(ids != -1){
			constructedMessage = "```"+msg.alias + " " + parseHitMessage("<!DOCTYPE html><html><body>"+msg.data.content+ "</body></html>") + "```";
		}
		else{
			if(!msg.data.content.search("midi-qol")){
				constructedMessage = '```' + msg.data.content + '```';
			}
			else {
				constructedMessage = '```Big descriptions of attack/spell go here!```';
			}
		}
	}
	sendMessage(msg, constructedMessage, hookEmbed);
});

function parseHitMessage(msg){
	var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(msg, 'text/xml');
  
  var search = htmlDoc.getElementsByClassName("midi-qol-nobox");
  if(search == undefined){
	return msg + " x:1";
  }
  var sec = search[0].getElementsByClassName("midi-qol-flex-container");
  if(sec == undefined){
	return msg + " x:2";
  }
  var hitOrMiss = sec[0].getElementsByTagName("div")[0].innerHTML;
   if(hitOrMiss == null){
	return msg + " x:3";
  }
  var name = sec[0].getElementsByTagName("div")[2].innerHTML;
   if(name == null){
	return msg + " x:4";
  }
  
  return hitOrMiss.trim()+" "+name.trim();
}

function sendMessage(message, msgText, hookEmbed) {
	var actor = loadActorForChatMessage(message.data.speaker);
    let img = "";
    if (actor) {
        img = generatePortraitImageElement(actor)
    }
    else {
        img = message.user.avatar;
    }
	
    var request = new XMLHttpRequest();
    request.open("POST", game.settings.get("DiscordConnect", "webHookURL"));
	request.setRequestHeader('Content-type', 'application/json');
	var params = {
		username: message.alias,
		avatar_url: game.settings.get("DiscordConnect", "inviteURL") + img,
		content: msgText,
		embeds: hookEmbed
	}
	request.send(JSON.stringify(params));
}

function createDialog(title, content){
	let d = new Dialog({
	title: title,
	content: "<p>"+content+"</p>",
	buttons: {
	  one: {
	   icon: '<i class="fas fa-check"></i>',
	   label: "Option One",
	   callback: () => console.log("Chose One")
	  },
	  two: {
	   icon: '<i class="fas fa-times"></i>',
	   label: "Option Two",
	   callback: () => console.log("Chose Two")
	  }
	 },
	 default: "two",
	 render: html => console.log("Register interactivity in the rendered dialog"),
	 close: html => console.log("This always is logged no matter which option is chosen")
	});
	d.render(true);
}

/**
 * Load the appropriate actor for a given message, leveraging token or actor or actor search.
 * @param {*} speaker
 */
function loadActorForChatMessage(speaker) {
	var actor;
	if (speaker.token) {
		actor = game.actors.tokens[speaker.token];
	}
	if (!actor) {
		actor = game.actors.get((speaker.actor));
	}
	if (!actor) {
		game.actors.forEach((value) => {
		if (value.name === speaker.alias) {
			actor = value;
		}
		});
	}
	return actor;
}

function  generatePortraitImageElement(actor) {
    let img = "";
    img = actor.token ? actor.token.data.img : actor.data.token.img;
    return img;
  }
