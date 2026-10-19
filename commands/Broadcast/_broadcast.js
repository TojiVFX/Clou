/*CMD
  command: /broadcast
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Broadcast

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin_id = 5491775006;  // Replace with your Telegram ID

if (user.telegramid != admin_id) {
  Bot.sendMessage("❌ You are not authorized to use this command.");
  return;
}

// Show broadcast type menu
Api.sendMessage({
  text: "🛠️ *Broadcast Menu*\n\nChoose the type of broadcast you want to send:",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "📝 Text", callback_data: "set_mode_text" },
        { text: "🖼️ Photo", callback_data: "set_mode_photo" }
      ],
      [
        { text: "🖼️ Photo + Caption", callback_data: "set_mode_photo_caption" }
      ],
      [
        { text: "📝 Text + Buttons", callback_data: "set_mode_text_button" }
      ]
    ]
  }
});
