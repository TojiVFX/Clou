/*CMD
  command: await_bcast_buttons
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

// STEP 2 — Handle Inline Buttons input

if (User.getProperty("await_bcast_buttons")) {
  let lines = message.split("\n");
  let buttons = [];
  let valid = true;

  if (lines.length > 5) {
    Bot.sendMessage("❌ You can send a maximum of *5 links only.*", { parse_mode: "Markdown" });
    return;
  }

  lines.forEach(function(line) {
    let parts = line.split(" - ");
    if (parts.length != 2 || !parts[1].startsWith("http")) {
      valid = false;
    } else {
      buttons.push([{ text: parts[0].trim(), url: parts[1].trim() }]);
    }
  });

  if (!valid) {
    Bot.sendMessage(
      "❌ Invalid format.\n\nPlease send like this:\n\n" +
      "`Test - https://example.com`\n`Google - https://google.com`\n\n" +
      "_Up to 5 links are allowed_",
      { parse_mode: "Markdown" }
    );
    return;
  }

  // Save buttons JSON
  User.setProperty("bcast_inline_buttons", buttons, "json");
  User.setProperty("await_bcast_buttons", false, "boolean");

  // Call broadcast command
  Bot.runCommand("await_bcast_buttons");
  return;
}
