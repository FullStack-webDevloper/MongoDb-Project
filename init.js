const mongoose = require('mongoose');
const Chat =require("./models/chat.js");
main()
.then(() => {console.log('Connected!')})
 .catch((err)=>{console.log(err)});
 async function main(){
 await mongoose.connect('mongodb://127.0.0.1:27017/chatingapp');
};
const allchats = [
    {
        from: 'User1',
        to: 'User2',
        msg: 'Hello!',
        created_at: new Date()
    },
    {
        from: 'User2',
        to: 'User1',
        msg: 'Hi there!',
        created_at: new Date()
    },
    {
        from: 'User1',
        to: 'User3',
        msg: 'How are you?',
        created_at: new Date()
    },
    {
        from: 'User3',
        to: 'User1',
        msg: 'I\'m good, thanks!',
        created_at: new Date()
    },
    {
        from: 'User2',
        to: 'User3',
        msg: 'Nice weather today!',
        created_at: new Date()
    },
    {
        from: 'User3',
        to: 'User2',
        msg: 'Agreed!',
        created_at: new Date()
    },
    {
        from: 'User1',
        to: 'User4',
        msg: 'Greetings!',
        created_at: new Date()
    },
    {
        from: 'User4',
        to: 'User1',
        msg: 'Hello!',
        created_at: new Date()
    },
    {
        from: 'User2',
        to: 'User4',
        msg: 'How\'s it going?',
        created_at: new Date()
    },
    {
        from: 'User4',
        to: 'User2',
        msg: 'Not bad!',
        created_at: new Date()
    }
];

// Inserting the array of chats
Chat.insertMany(allchats)