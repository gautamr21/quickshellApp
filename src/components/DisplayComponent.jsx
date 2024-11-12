import React from 'react';

function DisplayComponent({ setGroupBy, setSortBy }) {
  return (
    <div className="display-component">
      <h3>Group By:</h3>
      <select onChange={(e) => setGroupBy(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
      <h3>Sort By:</h3>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

export default DisplayComponent;
