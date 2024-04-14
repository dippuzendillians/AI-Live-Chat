document.addEventListener("DOMContentLoaded", function() {
  // Define the chatbot HTML structure
  const chatbotHTML = `
  <link rel="stylesheet" href="https://dippuzen.com/themes/ailivechat/assets/css/chatbot.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0" />
    <button class="chatbot-toggler">
      <span class="material-symbols-rounded">mode_comment</span>
      <span class="material-symbols-outlined">close</span>
    </button>
    <div class="chatbot">
      <header>
        <h2>Chatbot</h2>
        <span class="close-btn material-symbols-outlined">close</span>
      </header>
      <ul class="chatbox">
        <li class="chat incoming">
          <span class="material-symbols-outlined">smart_toy</span>
          <p>Hi there..!<br>How can I help you today?</p>
        </li>
      </ul>
      <div class="chat-input">
        <textarea placeholder="Enter a message..." spellcheck="false" required></textarea>
        <span id="send-btn" class="material-symbols-rounded">send</span>
      </div>
    </div>
  `;

  // Insert the chatbot HTML into the page
  document.body.insertAdjacentHTML("beforeend", chatbotHTML);

  // Initialize chatbot functionalities after inserting the HTML
  initializeChatbot();
});

function initializeChatbot() {
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const loaderImg = document.createElement("img");
  loaderImg.src = "https://dippuzen.com/themes/ailivechat/assets/images/loader.gif"; // Replace "path/to/loader.gif" with the actual path to your loader GIF
  loaderImg.alt = "Loading..."; // Add alt text for accessibility
  loaderImg.classList.add("loader"); // Add a class to style the loader if needed

  // const createLoaderChatLi = () => {
  //     // Create a chat <li> element with the loader GIF
  //     const chatLi = document.createElement("li");
  //     chatLi.classList.add("chat", "incoming");
  //     chatLi.appendChild(loaderImg.cloneNode(true));
  //     return chatLi;
  // };
  
  const createLoaderChatLi = () => {
    // Create a chat <li> element with the loader GIF
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", "incoming");
    
    // Create the span element
    const spanElement = document.createElement("span");
    spanElement.classList.add("material-symbols-outlined-smarttoylaod");
    spanElement.textContent = "smart_toy";
    
    // Add the span element as the first child of chatLi
    chatLi.appendChild(spanElement);

    // Add the loader image after the span element
    chatLi.appendChild(loaderImg.cloneNode(true));

    return chatLi;
};

  const removeLoader = () => {
    const loaderChatLi = chatbox.querySelector(".loader");
    const smarttoylaod = chatbox.querySelector(".material-symbols-outlined-smarttoylaod");
    if (loaderChatLi) {
        loaderChatLi.remove();
        smarttoylaod.remove();
    }
};

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

const generateResponse = (chatElement,jsonData) => {
  // Define the properties and message for the API request
  // const formattedData = jsonData.map(item => `Title: ${item.title}. Content: ${item.content}`).join("\n");
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
          model: "gpt-4-0125-preview",
          messages: [
            { role: "system", content: "Given the business information provided below, our AI representative will assist you with your inquiries. This AI is designed to provide professional responses based solely on the business details shared. Should your questions fall outside the scope of this business's services or information, we will politely inform you. Here's the business information to guide our conversation:\n\n" + jsonData + "\n\nPlease note: Our AI strives to maintain a professional demeanor and focuses on delivering accurate and relevant information pertaining to the business. For questions unrelated to our business services or information, we kindly suggest reaching out to the appropriate sources for assistance." },
            {role: "user", content: userMessage}],
      })
  };

  // Send POST request to API, get response and set the reponse as paragraph text
  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
  .then(res => res.json())
  .then(data => {
    console.log(data);
      const botResponse = data.choices[0].message.content.trim();

      // Append the bot's response to the chatbox
      chatbox.appendChild(createChatLi(botResponse, "incoming"));
      chatbox.scrollTo(0, chatbox.scrollHeight);
      removeLoader();
  })
  .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Something went wrong. Please try again.";
      removeLoader();
  })
  .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if(!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  // setTimeout(() => {
  //     // Display "Thinking..." message while waiting for the response
  //     const incomingChatLi = createChatLi("Thinking...", "incoming");
  //     chatbox.appendChild(incomingChatLi);
  //     chatbox.scrollTo(0, chatbox.scrollHeight);
  //     generateResponse(incomingChatLi);
  // }, 600);
  setTimeout(() => {
    // Display the loader GIF while waiting for the response
    // const incomingChatLi = createChatLi("Thinking...", "incoming");
    // chatbox.appendChild(incomingChatLi);
    const loaderChatLi = createLoaderChatLi();
    chatbox.appendChild(loaderChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    // JSON Data from the file
var scripts = document.getElementsByTagName('script');
var currentScript = scripts[scripts.length - 1];
var dataParam = currentScript.dataset.param;

fetch('https://dippuzen.com/api/getBot/'+dataParam)
.then(response => response.json())
.then(data => {
//  console.log(data.data);
  //const intdata  = data.data;
  const jsonData =  JSON.stringify(data);
 // const jsonData = intdata.map(item => `Title: ${item.title}. Content: ${item.content}`).join("\n");
  const chatElement = '';
  generateResponse(loaderChatLi, jsonData);
})
.catch(error => {
  console.error('Error:', error);
});
   // generateResponse(loaderChatLi); // Call generateResponse after adding the loader
}, 600);

};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window 
  // width is greater than 800px, handle the chat
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

};
