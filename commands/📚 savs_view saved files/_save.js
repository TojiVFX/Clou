/*CMD
  command: /save
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 📚 savs/view saved files
  answer: *Please send me the file (Photo, Video, Document, or Text*

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

  Bot.runCommand("showTerms"); // Show Terms Again
  return;
}
// Delete the message when button is clicked
if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}

// If user didn't send a valid file/text
if (!(request.photo || request.video || request.document || request.text)) {
  Bot.sendMessage("❌ Please send a valid file, photo, video, document or text.");
  return;
}

// Initialize file details
let file_type = "";
let file_id = "";
let file_name = "";

// Handle photo (with caption as title)
if (request.photo) {
  let photoArr = request.photo;
  if (Array.isArray(photoArr) && photoArr.length > 0) {
    let largestPhoto = photoArr[photoArr.length - 1];
    file_type = "photo";
    file_id = largestPhoto.file_id;
    file_name = request.caption ? request.caption : "Photo";
  }
}

// Handle video
if (!file_type && request.video) {
  file_type = "video";
  file_id = request.video.file_id;
  file_name = request.video.file_name || (request.caption ? request.caption : "Video");
}

// Handle document
if (!file_type && request.document) {
  file_type = "document";
  file_id = request.document.file_id;
  file_name = request.document.file_name || (request.caption ? request.caption : "Document");
}

// Handle text
if (!file_type && request.text) {
  file_type = "text";
  file_id = ""; // text has no file_id
  file_name = request.text;
}

// If file type is still not detected
if (!file_type) {
  Bot.sendMessage("❌ Error detecting file type. Please try again.");
  return;
}

// Save temporarily for next step
Bot.setProperty("temp_upload", { file_id: file_id, file_type: file_type, file_name: file_name }, "json");

// Delete user's message (file/text they sent)
if (request && request.message_id) {
  Api.deleteMessage({ chat_id: user.telegramid, message_id: request.message_id });
}

// Send secure file question with inline keyboard (Fixed keyboard structure)
Api.sendMessage({
  chat_id: user.telegramid,
  text: "<b>Do you want to secure this file with a password?</b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "✅ Yes", callback_data: "enter_password" },
        { text: "🔐 Random", callback_data: "random_password" }
      ],
      [
        { text: "❌ No", callback_data: "save_file_now" }
      ]
    ]
  }
});
