import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState(['Select user']); 
  const [selectedUser, setSelectedUser] = useState('User1');
  const [newUser, setNewUser] = useState(''); 
  const [currentGroup, setCurrentGroup] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [groups, setGroups] = useState({});
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleCreateGroup = () => {
    if (newGroup && !groups[newGroup]) {
      setGroups((prevGroups) => ({ ...prevGroups, [newGroup]: [] }));
      setCurrentGroup(newGroup);
      setNewGroup('');
    }
  };

  const handleSelectGroup = (group) => {
    setCurrentGroup(group);
    setChatHistory(groups[group] || []);
  };

  const handleSendMessage = () => {
    if (message && currentGroup) {
      const timestamp = new Date().toLocaleTimeString();
      const newMessage = { username: selectedUser, message, timestamp };

      setGroups((prevGroups) => {
        const updatedGroup = [...(prevGroups[currentGroup] || []), newMessage];
        return { ...prevGroups, [currentGroup]: updatedGroup };
      });

      setMessage('');
    }
  };

  const handleAddUser = () => {
    if (newUser && !users.includes(newUser)) {
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setNewUser('');
    }
  };

  useEffect(() => {
    if (currentGroup) {
      setChatHistory(groups[currentGroup] || []);
    }
  }, [groups, currentGroup]);

  return (
    <div className="App">
      <div>
        <h2>ChatApp</h2>

        <label className='mt-3 mb-2'>User:~ </label>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          {users.map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
        </select>

        <div>
          <input
            placeholder="New User"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <button onClick={handleAddUser} className="dd">Add User</button>
        </div>
        
        <div className='cc'>
          <input
            placeholder="New Group"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
          <button onClick={handleCreateGroup} className='ff'>Create Group</button>
        </div>

        <label>Groups :~</label>
        <select onChange={(e) => handleSelectGroup(e.target.value)} value={currentGroup}>
          <option value="">Select Group</option>
          {Object.keys(groups).map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        {currentGroup && (
          <div>
            <div className='aa'>
              <h3>Group: {currentGroup}</h3>
            </div>

            <div className="chat-box">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.username === selectedUser ? 'sent' : 'received'}`}>
                  <strong>{msg.username}</strong>: {msg.message} <span className="timestamp">({msg.timestamp})</span>
                </div>
              ))}
            </div>

            <input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} className='bb'>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
