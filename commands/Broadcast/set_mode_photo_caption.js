/*CMD
  command: set_mode_photo_caption
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

// Save broadcast mode
User.setProperty("bcast_mode", "photo_caption", "string");

// Ask for photo+caption
Bot.sendMessage("🖼✏️ Please send the *Photo* with *Caption* you want to broadcast.", { parse_mode: "Markdown" });

// Don't runCommand here!! JUST WAIT for user message.
Bot.runCommand("handle_broadcast");
