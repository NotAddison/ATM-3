import requests
import json
import geocoder
from discord_webhook import DiscordWebhook, DiscordEmbed
g = geocoder.ip('me')

webhook = DiscordWebhook(url='https://discord.com/api/webhooks/1036102961996247150/3keTw9J2paixnUpe39wytQEzo0hKP3RnoYWu6TZbhpctne6BKHRMOIntAoEDtECSftZH')

# API Function
def GetName():
    url = "http://localhost:3000/auth/1/"
    response = requests.get(url)
    data = response.json()
    return data["name"]


# Send GENERIC Discord Webhook
def SendHostageHook(test = True):
    embed = DiscordEmbed(title='⚠ HOSTAGE Situation Detected ⚠', description='Potential hostage situation!', color=242424)
    # embed.set_footer(text='Hostage Taken')
    embed.set_timestamp()
    embed.add_embed_field(name='Name', value=GetName())
    if test:   
        embed.add_embed_field(name='IP', value=g.ip)
        embed.add_embed_field(name='Lat', value= f"{g.lat}")
        embed.add_embed_field(name='Long', value=f"{g.lng}")
    webhook.add_embed(embed)
    response = webhook.execute()
    print(f"isHostage Webhook: {response}")