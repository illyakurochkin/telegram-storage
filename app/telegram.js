const {Telegraf} = require('telegraf');
const fs = require('fs');

let bot;

const initialize = async () => {
  bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start((ctx) => ctx.reply('Welcome'));
  bot.launch();
};

const writePhoto = async (chatId, file) => {
  const data = fs.readFileSync(`uploads/${file.filename}`)
  const result = await bot.telegram.sendDocument(chatId, {source: data, filename: 'photo.png'});
  return result.document.file_id;
};

const readPhoto = async (fileId) => {
  return bot.telegram.getFileLink(fileId);
};

module.exports = {
  initialize,
  writePhoto,
  readPhoto,
};

