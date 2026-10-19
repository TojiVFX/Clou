/*CMD
  command: save_file_now
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

function gen_uid() {
  return Math.random().toString(36).substring(2, 12);  // 10-char random UID
}

let upload = Bot.getProperty("temp_upload", {});
let password = Bot.getProperty("temp_password", null);

let all_data = Bot.getProperty("user_files", {});
if (!all_data) all_data = {};

let user_id = user.telegramid;
if (!all_data[user_id]) {
  all_data[user_id] = [];
}

let new_file = {
  file_uid: gen_uid(),
  file_id: upload.file_id,
  file_name: upload.file_name,
  type: upload.file_type,
  date: new Date().toISOString().split("T")[0],
  secure: password ? true : false,
  password: password || ""
};

all_data[user_id].push(new_file);
Bot.setProperty("user_files", all_data, "json");

// Clean temp props
Bot.setProperty("temp_upload", {}, "json");
Bot.setProperty("temp_password", "", "string");

Bot.sendMessage("✅ File saved successfully!");
