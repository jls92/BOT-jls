const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Timeout un utilisateur avec une durée personnalisée.',
  run: async (client, message, args) => {

    if (!message.member.permissions.has('ModerateMembers')) {
      return message.reply("Tu n'as pas la permission de timeout.");
    }

    const user = message.mentions.members.first();
    if (!user) return message.reply("Mentionne quelqu'un à timeout.");

    const time = args[1];
    if (!time) {
      return message.reply("Indique une durée. Exemple : `+mute @user 10m spam`");
    }

    // Conversion du format (10s, 5m, 2h, 3d)
    const match = time.match(/^(\d+)(s|m|h|d)$/);
    if (!match) {
      return message.reply("Format invalide. Utilise : `s`, `m`, `h`, `d` (ex : 10s, 5m, 2h, 1d)");
    }

    const value = parseInt(match[1]);
    const unit = match[2];

    let durationMs = 0;

    switch (unit) {
      case 's': durationMs = value * 1000; break;
      case 'm': durationMs = value * 60 * 1000; break;
      case 'h': durationMs = value * 60 * 60 * 1000; break;
      case 'd': durationMs = value * 24 * 60 * 60 * 1000; break;
    }

    const reason = args.slice(2).join(' ') || 'Aucune raison fournie';

    try {
      await user.timeout(durationMs, reason);
    } catch (err) {
      return message.reply("Impossible de timeout cet utilisateur.");
    }

    const embed = new EmbedBuilder()
      .setColor('#ff8800')
      .setTitle('⏳ Utilisateur timeout')
      .addFields(
        { name: 'Membre', value: `${user.user.tag}` },
        { name: 'Durée', value: `${time}` },
        { name: 'Modérateur', value: `${message.author.tag}` },
        { name: 'Raison', value: reason }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};