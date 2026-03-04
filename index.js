const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const config = require('./config');

// Création du client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel],
});

// Stockage des commandes
client.commands = new Map();

// Stockage du snipe
client.snipes = new Map();

// Stockage du système laisse
client.laisses = new Map();       // { dogId: { oldName, masterId } }
client.laissePerms = new Set();   // IDs autorisés à utiliser laisse

// Chargement automatique des commandes
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

// Gestion des commandes
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);
    if (command) {
        command.run(client, message, args);
    }
});

// Snipe system
client.on('messageDelete', msg => {
    client.snipes.set(msg.channel.id, {
        content: msg.content,
        author: msg.author,
        date: new Date()
    });
});

// 🐕 Système : le chien suit son maître en vocal
client.on('voiceStateUpdate', (oldState, newState) => {
    const masterId = newState.id;

    for (const [dogId, data] of client.laisses.entries()) {
        if (data.masterId !== masterId) continue;

        const dog = newState.guild.members.cache.get(dogId);
        if (!dog) continue;

        if (oldState.channelId !== newState.channelId) {
            if (newState.channelId) {
                dog.voice.setChannel(newState.channelId).catch(() => {});
            }
        }
    }
});

client.login(config.token);