import React, {useState} from 'react'
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

export default function ChatForm({socket}) {
    const [message, setmessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit("message", message);
        setmessage("");
        // Focus input
        document.querySelector(".chat-box > input").focus();
    }

    return (
        <Paper component="form" elevation={3} className="input-paper" onSubmit={handleSubmit} >
        <InputBase
        required
        className="chat-box"
        placeholder="Send a message"
        inputProps={{ 'aria-label': 'send a message' }}
        onChange={(e) => {
            setmessage(e.target.value);
        }}
        value={message}
      />
        <IconButton aria-label="chat" type="submit" className="send-icon">
        <SendIcon/>
      </IconButton>
      </Paper>
    )
}
