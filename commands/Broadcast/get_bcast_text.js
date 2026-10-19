/*CMD
  command: get_bcast_text
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Broadcast

  <<ANSWER

Now send the button links like this:

Example:
Test - https://example.com
Google - https://google.com

Up to 5 links allowed.
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (User.getProperty("await_bcast_text")) {
  User.setProperty("bcast_text", message, "string");
  User.setProperty("await_bcast_text", false, "boolean");

  Bot.sendMessage("✅ *Text saved!*\n\nNow send the button links like this:\n\n*Example:*\n`Test - https://example.com`\n`Google - https://google.com`\n\n_Up to 5 links allowed._", { parse_mode: "Markdown" });
  User.setProperty("await_bcast_buttons", true, "boolean");
}
Bot.runCommand("get_bcast_button");
