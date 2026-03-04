const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'laisseperm',
  description: 'Donne la permission d’utiliser les commandes de laisse.',
  run: async (client, message, args) => {

    if (message.author.id !== message.guild.ownerId) {
      return message.reply("Seul le propriétaire du serveur peut utiliser cette commande.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("Mentionne quelqu’un.");

    client.laissePerms.add(user.id);

    const embed = new EmbedBuilder()
      .setColor('#00aaff')
      .setTitle('🐕 Permission ajoutée')
      .setDescription(`${user.user.tag} peut maintenant utiliser les commandes de laisse.`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};