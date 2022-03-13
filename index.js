const Discord = require("discord.js")
require("dotenv").config()

const welcomeChannelId = process.env.MESSAGE_CHANNEL_ID
const { MessageEmbed } = require("discord.js");


const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Hello World!")
    }
})

client.on("guildMemberAdd", async (member) => {
    const welcomeEmbed = new MessageEmbed()
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