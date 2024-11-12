import React from 'react';
import './TicketCard.css';
import urgentIcon from '../icons_FEtask/SVG - Urgent Priority grey.svg'; // Replace with correct relative path
import highIcon from '../icons_FEtask/Img - High Priority.svg'; // Replace with correct relative path
import mediumIcon from '../icons_FEtask/Img - Medium Priority.svg'; // Replace with correct relative path
import lowIcon from '../icons_FEtask/Img - Low Priority.svg'; // Replace with correct relative path
import noPriorityIcon from '../icons_FEtask/No-priority.svg'; // Replace with correct relative path
import todoIcon from '../icons_FEtask/To-do.svg';
import inProgressIcon from '../icons_FEtask/in-progress.svg';
import backlogIcon from '../icons_FEtask/Backlog.svg';


const priorityIcons = {
  4: urgentIcon,
  3: highIcon,
  2: mediumIcon,
  1: lowIcon,
  0: noPriorityIcon,
};



function TicketCard({ ticket }) {
    return (
      <div className="ticket-card">
        <div className="ticket-header">
          <span className="ticket-id">{ticket.id}</span>
          <span className="user-id">{ticket.userId}</span>
        </div>
        <h3 className="ticket-title">{ticket.title}</h3>
        <div className="ticket-footer">
          <img
            src={priorityIcons[ticket.priority]}
            alt="Priority Icon"
            className="priority-icon"
          />
          <span className="ticket-label">Feature Request</span>
        </div>
      </div>
    );
  }
export default TicketCard;
