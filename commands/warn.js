const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Donne un avertissement à un utilisateur.',
  run: async (client, message, args) => {

    if (!message.member.permissions.has('KickMembers')) {
      return message.reply("Tu n'as pas la permission de warn.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("Mentionne quelqu'un à warn.");

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

    const embed = new EmbedBuilder()
      .setColor('#ffcc00')
      .setTitle('⚠️ Avertissement')
      .addFields(
        { name: 'Membre', value: `${user.user.tag}` },
        { name: 'Modérateur', value: `${message.author.tag}` },
        { name: 'Raison', value: reason }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });

    try {
      await user.send(`⚠️ Tu as reçu un avertissement sur **${message.guild.name}** : ${reason}`);
    } catch (err) {
      // L'utilisateur a peut-être les MP fermés
    }
  }
};