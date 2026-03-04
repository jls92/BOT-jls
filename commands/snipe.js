const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'snipe',
  description: 'Voir le dernier message supprimé.',
  run: async (client, message) => {
    const snipe = client.snipes.get(message.channel.id);
    if (!snipe) return message.reply("Aucun message supprimé ici.");

    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('🕵️ Dernier message supprimé')
      .addFields(
        { name: 'Auteur', value: snipe.author.tag },
        { name: 'Message', value: snipe.content || '*Message vide*' }
      )
      .setTimestamp(snipe.date);

    message.channel.send({ embeds: [embed] });
  }
};