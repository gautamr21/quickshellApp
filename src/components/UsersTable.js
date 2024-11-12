import React from 'react';

function UsersTable({ users }) {
  if (!users || users.length === 0) {
    return <p>No users available.</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            {Object.keys(users[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              {Object.values(user).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
