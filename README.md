# DiscordConnect
This is a FoundryVTT module designed to mirror Foundry chat to a Discord channel.

## Setup
1. Create a Webhook in your Discord server, and specify which channel to output chat to. Copy the Webhook URL, you'll need it later.
2. Add the module to FoundryVTT.
3. Open Foundry and configure the module settings. You will need your invite link for the foundry session, as well as the Webhook URL created in step 1.

That's it!

# Known Issues
-Having two GMs in one session will duplicate chat messages. I've just been too lazy to solve it, it should be easy to fix.
-Only partial support for midi-qol messages at the moment; more to come in the future!
-It's really bad with html content. Oops.

--------------------------------------------------

Special thanks to Foundry-DiscordBridge by nearlyNonexistent, whose code helped me figure out a few things about how Foundry worked!

Thanks also to Vaelos, who helped me submit it.
