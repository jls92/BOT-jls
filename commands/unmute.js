const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unmute',
  description: 'Retire le timeout d’un utilisateur.',
  run: async (client, message, args) => {

    if (!message.member.permissions.has('ModerateMembers')) {
      return message.reply("Tu n'as pas la permission d’unmute.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("Mentionne quelqu'un à unmute.");

    if (!user.isCommunicationDisabled()) {
      return message.reply("Cet utilisateur n’est pas en timeout.");
    }

    try {
      await user.timeout(null); // Retire le timeout
    } catch (err) {
      return message.reply("Impossible de retirer le timeout de cet utilisateur.");
    }

    const embed = new EmbedBuilder()
      .setColor('#00ff88')
      .setTitle('🔓 Timeout retiré')
      .addFields(
        { name: 'Membre', value: `${user.user.tag}` },
        { name: 'Modérateur', value: `${message.author.tag}` }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};