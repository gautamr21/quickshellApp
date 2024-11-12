import React from 'react';

function TicketsTable({ tickets }) {
  if (!tickets || tickets.length === 0) {
    return <p>No tickets available.</p>;
  }

  return (
    <div>
      <h2>Tickets</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            {Object.keys(tickets[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              {Object.values(ticket).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketsTable;
