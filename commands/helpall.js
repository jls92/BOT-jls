const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'helpall',
  description: 'Affiche toutes les commandes du bot.',

  run: async (client, message) => {

    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('📜 Commandes disponibles')
      .setDescription(`Préfixe : **${config.prefix}**`)
      .addFields(
        {
          name: '🛡️ Modération',
          value:
          '**+ban @user [raison]** — bannit un membre\n' +
          '**+unban ID** — débannit un utilisateur via son ID\n' +
          '**+mute @user durée raison** — timeout (ex : 10s, 5m, 2h, 1d)\n' +
          '**+unmute @user** — retire le timeout\n' +
          '**+warn @user raison** — avertit un membre',
        },
        {
          name: '🎉 Fun / Utilitaires',
          value:
          '**+ping** — test du bot\n' +
          '**+snipe** — affiche le dernier message supprimé',
        },
        {
          name: '🐕 Système laisse',
          value:
          '**+laisse @user** — met une laisse (🐕de_nomDuMaitre)\n' +
          '**+laisseremove @user** — retire la laisse\n' +
          '**+laisseperm @user** — donne la permission d’utiliser les commandes laisse',
        }
      )
      .setFooter({ text: 'Crow Bot — by JLS' })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};