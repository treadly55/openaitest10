import { OpenAI } from "openai"
require('dotenv').config();


const spaceShip = document.getElementById('klingonLang')
const headerImage = document.getElementById('headerImage')
const apiKeyReal = process.env.apiKey

spaceShip.addEventListener('change', function(){
    if(this.checked) {
        headerImage.src = "images/worf-1.png"
        setTimeout(function(){
            headerImage.src = "images/parrot.png"
        }, 2000)
    }
})



const inputBoxEntry = document.getElementById('userInput')

const submitButton = document.getElementById('submit-button')
const languageTitle = document.getElementById('selectLangTitle')
const returnedText = document.getElementById('returned-text')
const messageForGPT = ''


async function askChatGPT(input) {
    const messages = [
    {
        role: 'system',
        content: 'You translate messages to French'
    }, 
    {   
        role: 'user',
        content: input
    }
    ]

try {
    const openai = new OpenAI({
    apiKey: apiKeyReal,
    dangerouslyAllowBrowser: true
    })
    
    const response = await openai.chat.completions.create ({
    model: 'gpt-4',
    messages: messages})
    
    console.log(response)
    
    returnedText.textContent = response.choices[0].message.content
} catch (err) {
    console.log(err)
}}


submitButton.addEventListener('click', function(e) {
    e.preventDefault()
    const messageForGPT = inputBoxEntry.value
    inputBoxEntry.value = ''
    languageTitle.textContent = "Your translation 👇"
    askChatGPT(messageForGPT)
})
