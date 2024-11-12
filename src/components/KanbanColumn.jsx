import React from 'react';
import TicketCard from './TicketCard';

function KanbanColumn({ title, tickets }) {
  return (
    <div className="kanban-column">
      <h4>{title}</h4>
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
}


export default KanbanColumn;
