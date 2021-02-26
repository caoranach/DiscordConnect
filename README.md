# DiscordConnect
This is a FoundryVTT module designed to mirror Foundry chat to a Discord channel.

## Setup
1. Create a Webhook in your Discord server, and specify which channel to output chat to. Copy the Webhook URL, you'll need it later.
2. Add the module to FoundryVTT.
3. Open Foundry and configure the module settings. You will need your invite link for the foundry session, as well as the Webhook URL created in step 1.

That's it!

If you have multiple GMs in your game, the module will have two copies of each message by default. You can fix this by picking a "main" GM and setting their userID in the settings. You can get a user's ID by simply typing 'dc getID' into Foundry chat once it's all set up, and it will put your ID in your discord channel.

# Known Issues
-Only partial support for midi-qol messages at the moment; more to come in the future!
-It's really bad with html content. Oops.


# Future Plans
-I'd like it to work whether multiple GMs, one GM , or even no GM is present in a session. I hope to figure that out soon!
--------------------------------------------------

Special thanks to Foundry-DiscordBridge by nearlyNonexistent, whose code helped me figure out a few things about how Foundry worked!

Thanks also to Vaelos, who helped me submit it.
