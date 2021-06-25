# CORS issues

## Background

Now discord is using discord.com instead of discordapp.com they have tighened up their CORS stance (see https://github.com/discord/discord-api-docs/issues/2545), essentially requiring servers instead of browsers to make webhook requests. This breaks DiscordConnect.

## Instructions

You will need to set up both sections below:
- Apache Reverse SSL Proxy server
- Configure DiscordConnect to use the proxy

### Apache Reverse SSL Proxy

One solution is to use a Reverse (SSL) Proxy. There is a lot of information out in the wilds but none of it was complete.

If you're running your own FoundryVTT instance, and you have Apache web server installed, you can use that to provide a reverse proxy that can set/remove the headers correctly to pass Discord's stricter checks.

Here is a sample configuration for Apache that also acts as an SSL reverse proxy for VTT (you can omit this if you serve FoundryVTT another way)

Note there are two sections in the config:
- VTT Proxy Server Configuration - for mapping e.g. https://vtt.example.com to your FoundryVTT service on port 30000 - this is from the [FoundryVTT website itself](https://foundryvtt.com/article/apache/).
- DiscordProxy settings - this is the section you need to set up the discord proxy.

Be sure to replace example.com with your actual site name. The examples below suggest letsencrypt for the SSL certificates but you can do whatever you prefer here.

```
<VirtualHost *:443>
    # General SSL settings (Required for both VTT and DiscordProxy)
    ServerName vtt.example.com
    SSLEngine On
    SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem

    # START: VTT Proxy Server Configuration
    ProxyPreserveHost       On
    ProxyPass "/socket.io/" "ws://localhost:30000/socket.io/"
    ProxyPass /             http://localhost:30000/
    ProxyPassReverse /      http://localhost:30000/
    # END: VTT Proxy Server Configuration

    # START: DiscordProxy settings
    SSLProxyEngine On

    <LocationMatch "/discordproxy/">
        ProxyPreserveHost Off
        RequestHeader unset Referer
        RequestHeader unset sec-ch-ua
        RequestHeader unset Connection
        RequestHeader unset Origin
        RequestHeader unset Sec-Fetch-Site
        RequestHeader unset Sec-Fetch-Mode
        RequestHeader unset Sec-Fetch-Dest
        RequestHeader unset Cookie
        ProxyPass https://discord.com/api/
        ProxyPassReverse https://discord.com/api/
        Header always set "Access-Control-Allow-Origin" "https://vtt.example.com"
        Header always set "User-Agent" "discordproxy/1.0"
    </LocationMatch>
    # END: DiscordProxy settings

</VirtualHost>
```

### Configure DiscordConnect to use the proxy

In the Module Settings, there is a new option for "Proxy Web Hook URL". You should fill this out with your server (e.g. https://vtt.example.com/discordproxy/ following the above example) - ensure you add the trailing slash '/'!

Assuming you have all the other webhook URLs, That should be it!
