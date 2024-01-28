import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";


async function main() {
    console.log(colors.bold.green("Welcome to ChatGPT Bot!"));
    console.log(colors.bold.green("You can start chatting with the bot."));
    console.log("\n")

    const chatHistory = [];

    while(true) {

        const userInput = readlineSync.question(colors.yellow("You: "));

        try {
            //construct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({ role, content }))

            //add latest message from user to the history 
            messages.push({role: "user", content: userInput});

            //call the api
            const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages
      });

            const botText = chatCompletion.choices[0].message.content;
      
            if (userInput.toLocaleLowerCase() === "exit") {
                console.log(colors.green(`Bot: `)+botText);
                return;
            }

            console.log(colors.green(`Bot: `)+botText);

            //update history with user input and bot respone
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', botText]);

        } catch (error) {
            console.log(colors.red(error));
        }
    }
    
}
 
main();