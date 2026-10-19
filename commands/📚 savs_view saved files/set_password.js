/*CMD
  command: set_password
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 📚 savs/view saved files

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let content = message.toLowerCase();

if (content == "yes") {
  Bot.sendMessage("Please enter your password OR send `random` to auto-generate.");
  Bot.runCommand("enter_password");
} else if (content == "no") {
  Bot.runCommand("save_file_now");
} else {
  Bot.sendMessage("Please reply *Yes* or *No*.");
}
