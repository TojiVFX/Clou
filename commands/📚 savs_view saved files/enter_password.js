/*CMD
  command: enter_password
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 📚 savs/view saved files

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var accepted = User.getProperty("accepted_terms");

if (!accepted) {
  Api.sendMessage({
    text: "<i>⚠️ You must accept the terms & privacy policy to use the bot.</i>",
    parse_mode: "html"
  });

  Bot.runCommand("/showTerms"); // Show Terms Again
  return;
}// Delete the message when button is clicked
if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}
function randomPassword(length) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

let password = message;
if (password == "random") {
  password = randomPassword(10);
  Bot.sendMessage("Generated password: `" + password + "`");
}

Bot.setProperty("temp_password", password, "string");
Bot.runCommand("save_file_now");
