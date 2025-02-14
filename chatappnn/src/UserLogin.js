import React, { useState } from 'react';

function UserLogin({ usernames, onAddUser, onLogin }) {
  const [newUsername, setNewUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = () => {
    if (!newUsername.trim()) {
      setError('Username cannot be empty.');
    } else if (usernames.includes(newUsername)) {
      setError('Username already exists.');
    } else {
      onAddUser(newUsername);
      setNewUsername('');
      setError('');
    }
  };

  const handleLogin = () => {
    if (selectedUser) {
      onLogin(selectedUser);
    } else {
      setError('Please select or create a username.');
    }
  };

  return (
    <div className="user-login">
      <h2 className="mb-4">Login</h2>

      <label>Create Username:</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={handleAddUser} className="btn btn-outline-secondary">
          Add Username
        </button>
      </div>

      <label>Select Username:</label>
      <select
        className="form-select mb-3"
        onChange={(e) => setSelectedUser(e.target.value)}
        value={selectedUser}
      >
        <option value="">Select Username</option>
        {usernames.map((username, index) => (
          <option key={index} value={username}>{username}</option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}

      <button onClick={handleLogin} className="btn btn-primary" disabled={!selectedUser}>
        Login
      </button>
    </div>
  );
}

export default UserLogin;
