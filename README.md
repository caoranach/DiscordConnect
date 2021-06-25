# DiscordConnect
This is a FoundryVTT module designed to mirror Foundry chat to a Discord channel.

## Setup
 1. Create a Webhook in your Discord server, and specify which channel to output chat to. Copy  the Webhook URL, you'll need it later.
 a. Server Settings (or channel settings) > Integrations > Webhooks > [New Webhook]
 b. Set webhook name and channel to post to.
 c. [Copy Webhook URL]

*NOTE:* if you're planning on having different Foundry Worlds post to separate Discord OR a separate channel for Rolls, additional Webhooks will need to be created.

2. Add the module to FoundryVTT. 
Add-on Modules > Install Module > Search for DiscordConnect

3. Open Foundry and enable the module. 
Game Settings > Manage Modules

4. Configure the module settings in Foundry. See below for info on each setting.
Game Settings > Configure Settings > Module Settings

That's it!

**Ignore Whispers & Private Rolls:** Enable this to ensure GM and Private messages, (both rolls and chat) aren't posted to Discord for all to see.

**Game Invite URL:** the external, internet URL everyone connects to the server through
Game Settings > Game Access > Invitation Links "Internet"

**Webhook URL:** Discord Webhook URL from Step 1. This is where chat will be sent, not including rolls.

**Roll Webhook URL:** Discord Webhook URL for rolls - either the same webhook for rolls to appear in the same channel as chat, or a separate webhook needs to be setup for the rolls to appear in. Leave empty to ignore all rolls.

#Getting Main GM ID
**Option A:**
1. Open browser Inspect/Developer Tools on the Foundry tab
Chrome: (Windows, Linux, Chrome OS): [F12] or Control+Shift+C
Chrome (Mac): Command+Option+C

2. Within Console type:
game.user for current user information
game.users for all user information

3. Expand to find the correct user's name and find the _id (> data : 16 character string)
This is the ID needed for the Main GM ID field.

**Option B:**
1. Install and enable the module, and provide a webhook.

2. Type **dc getID** into chat as the user you would like to get the ID of.

3. Check your discord chat channel as defined by your webhook.

*NOTE:* The Main GM must be logged in for DiscordConnect to work!

# Known Issues

-Only partial support for midi-qol messages at the moment; more to come in the future!

-It's really bad with html content in general. Oops.

-With the move to discord.com, you'll likely need to use a reverse proxy server to get this working. See [CORS.md](CORS.md) for more information.

# Future Plans

I want it to work regardless of how many gm's there are, without needing users to select a "primary". 

Hopefully total support for major other modules (like midi-qol!) won't be too huge. 


# Feedback

If you have any questions, issues, or suggested features, feel free to dm me on discord (Caoranach#9357) or email me at caoranach.ar@gmail.com!


--------------------------------------------------

Special thanks to Foundry-DiscordBridge by nearlyNonexistent, whose code helped me figure out a few things about how Foundry worked!

Thanks also to Vaelos, who helped me submit it.
