/*CMD
  command: set_mode_text_button
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Broadcast
  answer: 📝 Please send the *broadcast text*.

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Bot.sendMessage("📨 Please send the *broadcast text* you want to send to users.", { parse_mode: "Markdown" });
User.setProperty("await_bcast_text", true, "boolean");
Bot.runCommand("get_bcast_text");
