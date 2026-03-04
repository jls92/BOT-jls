const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'laisse',
  description: 'Met une laisse à un utilisateur.',
  run: async (client, message, args) => {

    if (
      !message.member.permissions.has('ManageNicknames') &&
      !client.laissePerms.has(message.author.id)
    ) {
      return message.reply("Tu n'as pas la permission de mettre une laisse.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("Mentionne quelqu'un.");

    if (user.id === message.author.id) {
      return message.reply("Tu ne peux pas te mettre une laisse à toi-même.");
    }

    if (client.laisses.has(user.id)) {
      return message.reply("Cet utilisateur a déjà une laisse.");
    }

    const oldName = user.displayName;

    // Nouveau pseudo = 🐕de_nomDuMaitre
    const masterName = message.member.displayName.replace(/[^a-zA-Z0-9]/g, "_");
    const newName = `🐕de_${masterName}`;

    try {
      await user.setNickname(newName);
    } catch (err) {
      return message.reply("Impossible de changer le pseudo.");
    }

    client.laisses.set(user.id, {
      oldName: oldName,
      masterId: message.author.id
    });

    const embed = new EmbedBuilder()
      .setColor('#ffaa00')
      .setTitle('🐕 Laisse activée')
      .addFields(
        { name: 'Utilisateur', value: `${user.user.tag}` },
        { name: 'Nouveau pseudo', value: newName },
        { name: 'Maître', value: `${message.author.tag}` }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};