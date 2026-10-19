/*CMD
  command: view_file
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

var accepted = User.getProperty("accepted_terms");

if (!accepted) {
  Api.sendMessage({
    text: "<i>⚠️ You must accept the terms & privacy policy to use the bot.</i>",
    parse_mode: "html"
  });

  Bot.runCommand("/showTerms"); // Show Terms Again
  return;
}
let all_data = Bot.getProperty("user_files", {});
if (!all_data) all_data = {};

let user_id = user.telegramid;
let file_uid = params.split(' ')[0];

let fileList = all_data[user_id];
if (!fileList || fileList.length === 0) {
  Api.editMessageText({
    chat_id: user.telegramid,
    message_id: request.message.message_id,
    text: "❌ You don't have any saved files."
  });
  return;
}

let file = fileList.find(function(f) {
  return f.file_uid == file_uid;
});

if (!file) {
  Api.editMessageText({
    chat_id: user.telegramid,
    message_id: request.message.message_id,
    text: "❌ File not found!"
  });
  return;
}

let file_info = `*📄 File Name:* ${file.file_name}\n*🆔 File UID:* ${file.file_uid}\n*📂 Type:* ${file.type}\n*📅 Saved Date:* ${file.date}\n*🔒 Secure:* ${file.secure ? "Yes" : "No"}`;

let buttons = [
  [{ text: "📥 Download", callback_data: "download_file " + file.file_uid }],
  [{ text: "✏️ Change Password", callback_data: "change_password " + file.file_uid },
   { text: "🗑️ Delete", callback_data: "delete_file " + file.file_uid }],
  [{ text: "⬅️ Back to Files", callback_data: "list_files" }]
];

Api.editMessageText({
  chat_id: user.telegramid,
  message_id: request.message.message_id,
  text: file_info,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: buttons }
});
