/*CMD
  command: random_password
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Handle callback data (button clicks)
if (request && request.data) {
  if (request.data === "random_password") {
    
    // Delete the inline keyboard message (previous message)
    Api.deleteMessage({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id
    });

    // Generate random password
    function randomPassword(length) {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let pass = "";
      for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return pass;
    }

    let password = randomPassword(10);

    // Save password
    Bot.setProperty("temp_password", password, "string");

    // Send generated password + note + "I Saved" button
    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "<b>🔐 Your generated password:</b>\n\n<code>" + password + "</code>\n\n" +
        "⚠️ <b>Important Note:</b>\nPlease save this password in a safe place. You will need it to access/download this file later.",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ I Saved", callback_data: "saved_password_confirm" }
          ]
        ]
      }
    });

    // Proceed to save file now
    Bot.runCommand("save_file_now");
    // Removed: return;
  }
}
