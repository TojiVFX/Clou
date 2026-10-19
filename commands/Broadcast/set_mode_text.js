/*CMD
  command: set_mode_text
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

User.setProperty("bcast_mode", "text", "string");
Bot.sendMessage("✏️ Please send the *Text* you want to broadcast.", { parse_mode: "Markdown" });
Bot.runCommand("handle_broadcast");
