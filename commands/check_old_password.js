/*CMD
  command: check_old_password
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let user_id = user.telegramid;
let input_password = message;

// Get file_uid we are verifying
let file_uid = Bot.getProperty("verify_password_" + user_id);

if (!file_uid) {
  Bot.sendMessage("❌ Session expired. Please start again.");
  return;
}

let all_data = Bot.getProperty("user_files", {});
let fileList = all_data[user_id];

if (!fileList) {
  Bot.sendMessage("❌ You have no files saved.");
  return;
}

let file = fileList.find(f => f.file_uid === file_uid);

if (!file) {
  Bot.sendMessage("❌ File not found.");
  return;
}

// Verify password
if (file.password != input_password) {
  Bot.sendMessage("❌ *Wrong password!*\n\n🔑 Please send the current password again for file: `" + file.file_name + "`", {parse_mode: "Markdown"});
  
  Bot.run({ command: "check_old_password" }); // Run again to wait for correct password
  return;
}

// Password correct → ask new password
Bot.setProperty("verify_password_" + user_id, "", "string");
Bot.setProperty("await_password_" + user_id, file_uid, "string");

Bot.sendMessage("✅ *Password verified!*\n\nNow send me the new password for file: `" + file.file_name + "`", {parse_mode: "Markdown"});

Bot.run({ command: "change_pass" });
return;
