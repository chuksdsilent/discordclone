import { AddCircle, CardGiftcard, EmojiEmotions, GifOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Chat.css'
import ChatHeader from './ChatHeader'
import { selectChannelId, selectChannelName } from './features/appSlice'
import { selectUser } from './features/userSlice'
import db from './Firebase'
import Message from './Message'

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([])

    console.log(channelId);
    useEffect(() => {
        if (channelId) {
            db.collection("channels").doc(channelId).collection("message")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }

    }, [channelId]);
    console.log(messages);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("channels").doc(channelId).collection("message")
            .add({
                // timestamp: firebase.Firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user
            });
        setInput("");
    }
    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <div className="chat__messages">
                {
                    messages.map((message) => (
                        <Message message={message.message} user={message.user} />
                    ))
                }
            </div>
            <div className="chat__input">
                <AddCircle fontSize="large" />
                <form >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        disabled={!channelId}
                        placeholder={`Message ${channelName}`} />
                    <button
                        onClick={sendMessage}
                        disabled={!channelId}
                        type="submit" className="chat__inputButton">

                        Send Message
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcard fontSize="large" />
                    <GifOutlined fontSize="large" />
                    <EmojiEmotions fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
