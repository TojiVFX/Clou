/*CMD
  command: change_password
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

let all_data = Bot.getProperty("user_files", {});
if (!all_data) all_data = {};

let user_id = user.telegramid;
let file_uid = params.split(' ')[0];

let fileList = all_data[user_id];
if (!fileList || fileList.length === 0) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ You have no files saved.",
    show_alert: true
  });
  return;
}

let file = fileList.find(function(f) {
  return f.file_uid == file_uid;
});

if (!file) {
  Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ File not found.",
    show_alert: true
  });
  return;
}

// ----- If file has no password, no need to verify -----
if (!file.password) {
  // No old password, directly ask new password
  Bot.setProperty("await_password_" + user_id, file_uid, "string");

  Bot.sendMessage("🔑 *This file has no existing password.*\nSend me the new password for file: `" + file.file_name + "`", {parse_mode: "Markdown"});
  
  Bot.run({ command: "change_pass" });
  return;
}

// ----- Ask user to send current password -----
Bot.setProperty("verify_password_" + user_id, file_uid, "string");

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "🔑 Please enter the current password of the file.",
  show_alert: true
});

Bot.sendMessage("🔑 *Send me the current password for file:* `" + file.file_name + "`", {parse_mode: "Markdown"});

Bot.run({ command: "check_old_password" });
return;
