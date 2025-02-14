import React from 'react';

function MessageBubble({ message }) {
    const isSentByUser = message.sender === message.username;

    return (
        <div style={{
            display: 'flex',
            justifyContent: isSentByUser ? 'flex-end' : 'flex-start',
            margin: '5px'
        }}>
            <div style={{
                backgroundColor: isSentByUser ? '#dcf8c6' : '#ffffff',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '60%'
            }}>
                <strong>{message.sender}</strong>
                <p>{message.text}</p>
                <small>{message.timestamp}</small>
            </div>
        </div>
    );
}

export default MessageBubble;
