const Discord = require("discord.js")
require("dotenv").config()

const welcomeChannelId = process.env.MESSAGE_CHANNEL_ID

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "!",
    owners: ["268178914982100994"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

client.on("guildMemberAdd", async (member) => {
    const welcomeEmbed = new Discord.MessageEmbed()
	.setColor("#000000")
	.setTitle(`Welcome to the server, ${member.user.username}#${member.user.discriminator}!`)
	.setDescription(`We hope you enjoy your stay! Make sure you check out the rules at ${member.guild.channels.cache.get('952710064307859476').toString()}.`)
	.setThumbnail(member.displayAvatarURL())
	.setImage("https://files.catbox.moe/qaby2m.jpg")
	.setTimestamp()
	.setFooter({ text: "botscribe v0.0.1", iconURL: "https://files.catbox.moe/ee352a.jpg" });

    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}>`,
        embeds: [welcomeEmbed]
    })
})

client.login(process.env.TOKEN)