import requests
import json
import geocoder
from discord_webhook import DiscordWebhook, DiscordEmbed
g = geocoder.ip('me')

def GetWebhookURL():
    url = "http://localhost:3000/webhook/"
    response = requests.get(url)
    data = response.json()
    return data["url"]


# API Function
def GetName():
    url = "http://localhost:3000/auth/1/"
    response = requests.get(url)
    data = response.json()
    return data["name"]

webhook = DiscordWebhook(url= GetWebhookURL())


def BindIP():
    url = 'http://localhost:3000/ip/'
    data = {
        'IP': g.ip,
        'Lat': g.lat,
        'Long': g.lng
    }
    requests.post(url, json=data)
    

# Send GENERIC Discord Webhook
def SendHostageHook(test = True):
    embed = DiscordEmbed(title='⚠ HOSTAGE Situation Detected ⚠', description='Potential hostage situation!', color=242424)
    embed.set_timestamp()
    embed.add_embed_field(name='Name', value=GetName())
    if test:   
        embed.add_embed_field(name='IP', value=g.ip)
        embed.add_embed_field(name='Lat', value= f"{g.lat}")
        embed.add_embed_field(name='Long', value=f"{g.lng}")
    else:
        embed.add_embed_field(name='IP', value= "-NA-")
        embed.add_embed_field(name='Lat', value= "-NA-")
        embed.add_embed_field(name='Long', value= "-NA-")

    webhook.add_embed(embed)
    response = webhook.execute()
    print(f"isHostage Webhook: {response}")

# SendHostageHook(False)
ATMID = 2729
def UpdateATMValue(item, boolean):
    url = 'http://localhost:3000/atm'
    res = requests.get(url)
    data = res.json()
    for atm in data["ATMs"]:
        if atm["ATMID"] == ATMID:
            atm[item] = boolean
            break
    requests.post(url, json=data)