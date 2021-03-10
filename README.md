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

-It's really bad with html content in general. Oops.


# Future Plans

I want it to work regardless of how many gm's there are, without needing users to select a "primary". 

Hopefully total support for major other modules (like midi-qol!) won't be too huge. 


# Feedback

If you have any questions, issues, or suggested features, feel free to dm me on discord (Caoranach#9357) or email me at caoranach.ar@gmail.com!


--------------------------------------------------

Special thanks to Foundry-DiscordBridge by nearlyNonexistent, whose code helped me figure out a few things about how Foundry worked!

Thanks also to Vaelos, who helped me submit it.
