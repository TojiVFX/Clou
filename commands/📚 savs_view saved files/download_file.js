/*CMD
  command: download_file
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

let file_uid = params;
let all_data = Bot.getProperty("user_files", {});
let fileList = all_data[user.telegramid];

let file = fileList.find(function(f) {
  return f.file_uid == file_uid;
});

if (!file) {
  Bot.sendMessage("❌ File not found.");
  return;
}

if (file.secure) {
  Bot.sendMessage("🔒 This file is protected. Please enter the password:");
  Bot.setProperty("await_download_pass_" + user.telegramid, JSON.stringify({
    file_uid: file.file_uid,
    correct_pass: file.password
  }), "string");
  Bot.runCommand("await_download_pass");
} else {
  sendTheFile(file);
  Bot.sendMessage("✅ File sent!");
}

function sendTheFile(file){
  let sendOpts = {
    chat_id: user.telegramid,
    caption: "📄 *" + file.file_name + "*",
    parse_mode: "Markdown"
  };

  if (file.type === "photo") {
    sendOpts.photo = file.file_id;
    Api.sendPhoto(sendOpts);
  } else if (file.type === "video") {
    sendOpts.video = file.file_id;
    Api.sendVideo(sendOpts);
  } else {
    sendOpts.document = file.file_id;
    Api.sendDocument(sendOpts);
  }
}
