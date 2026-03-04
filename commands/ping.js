module.exports = {
  name: 'ping',
  description: 'Test du bot.',
  run: async (client, message, args) => {
    const msg = await message.reply("Pong !");
  }
};