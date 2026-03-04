const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'laisseremove',
  description: 'Retire la laisse d’un utilisateur.',
  run: async (client, message, args) => {

    if (
      !message.member.permissions.has('ManageNicknames') &&
      !client.laissePerms.has(message.author.id)
    ) {
      return message.reply("Tu n'as pas la permission d’enlever une laisse.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("Mentionne quelqu'un.");

    const data = client.laisses.get(user.id);
    if (!data) {
      return message.reply("Cet utilisateur n’a pas de laisse.");
    }

    const oldName = data.oldName;

    try {
      await user.setNickname(oldName);
    } catch (err) {
      return message.reply("Impossible de remettre l’ancien pseudo.");
    }

    client.laisses.delete(user.id);

    const embed = new EmbedBuilder()
      .setColor('#00cc66')
      .setTitle('🐕 Laisse retirée')
      .addFields(
        { name: 'Utilisateur', value: `${user.user.tag}` },
        { name: 'Ancien pseudo restauré', value: oldName },
        { name: 'Modérateur', value: `${message.author.tag}` }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};