const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Débannit un utilisateur via son ID.',
  run: async (client, message, args) => {

    if (!message.member.permissions.has('BanMembers')) {
      return message.reply("Tu n'as pas la permission de débannir.");
    }

    const userId = args[0];
    if (!userId) return message.reply("Donne l’ID de l’utilisateur à unban.");

    try {
      const bannedUser = await message.guild.bans.fetch(userId);

      await message.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setColor('#00cc66')
        .setTitle('🔓 Utilisateur débanni')
        .addFields(
          { name: 'Utilisateur', value: `${bannedUser.user.tag}` },
          { name: 'ID', value: userId },
          { name: 'Modérateur', value: `${message.author.tag}` }
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      return message.reply("Impossible de débannir cet utilisateur. Vérifie l’ID.");
    }
  }
};