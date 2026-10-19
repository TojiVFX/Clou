/*CMD
  command: change_pass
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

// ---- Get file_uid that is waiting for password ----
let file_uid = Bot.getProperty("await_password_" + user_id);

if (!file_uid) {
  Bot.sendMessage("❌ No file selected for password. Please try again.");
  return;
}

// ---- Load all user files ----
let all_files = Bot.getProperty("user_files", {}) || {};
let user_files = all_files[user_id] || [];

let file_data = user_files.find(f => f.file_uid === file_uid);

if (!file_data) {
  Bot.sendMessage("❌ File not found. Please start again.");
  Bot.setProperty("await_password_" + user_id, "", "string"); // Clear temp
  return;
}

// ---- Update password ----
file_data.password = input_password;
file_data.secure = true;

// ---- Save updated user files ----
all_files[user_id] = user_files;
Bot.setProperty("user_files", all_files, "json");

// ---- Clear temp ----
Bot.setProperty("await_password_" + user_id, "", "string");

// ---- Confirm ----
Bot.sendMessage("✅ Password has been set for your file: *" + file_data.file_name + "*", {parse_mode: "Markdown"});
Bot.runCommand("save_file_now");
