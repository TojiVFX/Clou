/*CMD
  command: acceptTerms
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Terms

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Delete the message when button is clicked
if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}

// Save that user accepted the terms
User.setProperty("accepted_terms", true, "boolean");

Api.sendMessage({
  text: "<b>✅ You have accepted the terms & privacy policy.</b>\n\nNow you can use the bot!",
  parse_mode: "html"
});

Bot.runCommand("/start"); // Redirect to Main Menu
