/*CMD
  command: set_mode_photo
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

User.setProperty("bcast_mode", "photo", "string");
Bot.sendMessage("🖼 Please send the *Photo* you want to broadcast.", { parse_mode: "Markdown" });
Bot.runCommand("handle_broadcast");
