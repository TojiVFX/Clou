/*CMD
  command: get_password_for_delete
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

let user_password_input = message; // user typed password

let file_uid = Bot.getProperty("pending_delete_file_uid_" + user.telegramid);

// Clear pending property (optional but clean)
Bot.setProperty("pending_delete_file_uid_" + user.telegramid, "", "string");

// Now run delete command with file_uid + entered password
Bot.runCommand("delete_file " + file_uid + " " + user_password_input);
