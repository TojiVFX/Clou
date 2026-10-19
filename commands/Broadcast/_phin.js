/*CMD
  command: /phin
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Broadcast

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (User.getProperty("await_bcast_buttons")) {

  function parseButtons(input) {
    let pattern = /([^\n-]+?)\s*-\s*(https?:\/\/[^\s]+)/gi;
    let matches = [];
    let match;
    while ((match = pattern.exec(input)) !== null) {
      matches.push({ text: match[1].trim(), url: match[2].trim() });
    }
    return matches;
  }

  let buttons = parseButtons(message);

  if (buttons.length === 0) {
    Bot.sendMessage("❌ Invalid format.\n\nPlease send like this:\n\n*Example:*\n`Test - https://example.com`\n`Google - https://google.com`\n\n_Up to 5 links allowed._", { parse_mode: "Markdown" });
  } else if (buttons.length > 5) {
    Bot.sendMessage("❌ You can send a maximum of *5* buttons.", { parse_mode: "Markdown" });
  } else {

    let inlineKeyboard = buttons.map(b => [{ text: b.text, url: b.url }]);

    let file_id = User.getProperty("bcast_photo_fileid");
    let caption = User.getProperty("bcast_caption");

    let all_users = Bot.getProperty("all_users", []) || [];
    let totalUsers = all_users.length;
    let success = 0;
    let fail = 0;

    for (let i = 0; i < all_users.length; i++) {
      try {
        Api.sendPhoto({
          chat_id: all_users[i],
          photo: file_id,
          caption: caption,
          parse_mode: "HTML",
          reply_markup: { inline_keyboard: inlineKeyboard }
        });
        success++;
      } catch (e) {
        fail++;
      }
    }

    // Send preview to Admin
    Api.sendPhoto({
      chat_id: user.telegramid,
      photo: file_id,
      caption: "<b>📢 Broadcast Preview</b>\n\n" + caption,
      parse_mode: "HTML",
      reply_markup: { inline_keyboard: inlineKeyboard }
    });

    let report =
      `📊 <b>Broadcast Report</b>\n\n` +
      `👥 <b>Total Users:</b> ${totalUsers}\n` +
      `✅ <b>Delivered:</b> ${success}\n` +
      `❌ <b>Failed:</b> ${fail}`;

    Api.sendMessage({ chat_id: user.telegramid, text: report, parse_mode: "HTML" });

    // Clear properties
    User.setProperty("bcast_photo_fileid", "", "string");
    User.setProperty("bcast_caption", "", "string");
    User.setProperty("await_bcast_buttons", false, "boolean");
  }
}
