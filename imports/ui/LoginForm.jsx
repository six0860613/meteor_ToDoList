import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const sendLogin = (e) => {
    e.preventDefault();

    // meteor自己的登入驗證
    Meteor.loginWithPassword(username, password);
  };

  return (
    <form onSubmit={sendLogin} className="login-form">
      <label htmlFor="username">Username</label>

      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Log In</button>
    </form>
  );
};
