/*CMD
  command: /bcast_text
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Broadcast
  answer: Plz Enter message

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: onMessage

let await_buttons = User.getProperty("await_bcast_buttons") || false;

if (await_buttons) {
  let raw_text = message;
  let lines = raw_text.split("\n");

  let buttons = [];
  for (let i = 0; i < lines.length && i < 5; i++) {
    let parts = lines[i].split(" - ");
    if (parts.length === 2) {
      let text = parts[0].trim();
      let url = parts[1].trim();
      buttons.push([{ text: text, url: url }]);
    }
  }

  if (buttons.length === 0) {
    Bot.sendMessage("❌ Invalid format. Please follow the example:\n`Text - URL`", { parse_mode: "Markdown" });
    return;
  }

  User.setProperty("bcast_buttons_data", JSON.stringify(buttons), "string");
  User.setProperty("await_bcast_buttons", false, "boolean");

  Bot.sendMessage("✅ Buttons saved!\n\nNow use /bcast_send to broadcast.", { parse_mode: "Markdown" });
}
