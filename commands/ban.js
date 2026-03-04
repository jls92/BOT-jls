const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bannir un utilisateur.',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('BanMembers')) {
      return message.reply("Tu n'as pas la permission de bannir.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("Mentionne quelqu'un à bannir.");

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

    await user.ban({ reason });

    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('🔨 Utilisateur banni')
      .addFields(
        { name: 'Membre', value: `${user.user.tag}` },
        { name: 'Modérateur', value: `${message.author.tag}` },
        { name: 'Raison', value: reason }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};