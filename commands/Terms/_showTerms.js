/*CMD
  command: /showTerms
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

var webAppUrl = WebApp.getUrl({ command: "termsFrom" }); // BB WebView URL

Api.sendMessage({
  text: "<b>Please read our terms and privacy policy before proceeding.</b>",
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ 
        text: "🌐 View Terms and Privacy Policy", 
        web_app: { url: webAppUrl } 
      }],
      [
        {
          text: "✅ Accept", 
          callback_data: "acceptTerms"
        },
        {
          text: "❌ Decline", 
          callback_data: "declineTerms"
        }
      ]
    ]
  }
});
