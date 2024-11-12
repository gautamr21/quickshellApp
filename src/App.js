import React, { useEffect, useState } from 'react';
import TicketCard from './components/TicketCard';
import './App.css'; // Include global styles
import displayIcon from './icons_FEtask/Display.svg';
import addIcon from './icons_FEtask/add.svg'; // Path to your Add icon
import menuIcon from './icons_FEtask/3 dot menu.svg'; // Path to your Menu (Three Dots) icon
import urgentIcon from './icons_FEtask/SVG - Urgent Priority grey.svg'; // Replace with correct relative path
import highIcon from './icons_FEtask/Img - High Priority.svg'; // Replace with correct relative path
import mediumIcon from './icons_FEtask/Img - Medium Priority.svg'; // Replace with correct relative path
import lowIcon from './icons_FEtask/Img - Low Priority.svg'; // Replace with correct relative path
import noPriorityIcon from './icons_FEtask/No-priority.svg'; // Replace with correct relative path

import todoIcon from './icons_FEtask/To-do.svg';
import inProgressIcon from './icons_FEtask/in-progress.svg';
import backlogIcon from './icons_FEtask/Backlog.svg';

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('user'); // Default grouping by 'user'
  const [showOptions, setShowOptions] = useState(false); // Toggle display options
  const [sorting, setSorting] = useState('ticketId'); // Default sorting by 'ticketId'

  // Priority mapping for display
  const priorityMapping = {
    '4': 'Urgent',
    '3': 'High Priority',
    '2': 'Medium Priority',
    '1': 'Low Priority',
    '0': 'No Priority',
  };

  const statusMapping = {
    '2': 'To Do',
    '1': 'In Progress',
    '0': 'Backlogs',
     };
  const priorityIcons = {
    'Urgent': urgentIcon,
    'High Priority': highIcon,
    'Medium Priority': mediumIcon,
    'Low Priority': lowIcon,
    'No Priority': noPriorityIcon,
  };
  
  const statusIcons = {
    'To Do': todoIcon,
    'In Progress': inProgressIcon,
    'Backlogs': backlogIcon,
  };
  
  
  
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets || []);
      })
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions); // Show/Hide dropdown
  };

  const sortTickets = (tickets) => {
    if (sorting === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority); // Descending order of priority
    }
    return [...tickets].sort((a, b) => a.id.localeCompare(b.id)); // Ascending order of Ticket ID
  };


  const groupTickets = () => {
    if (!grouping) {
      // Default grouping by Ticket ID if no grouping selected
      return { All: [...tickets].sort((a, b) => a.id.localeCompare(b.id)) };
    }

    let grouped = tickets.reduce((grouped, ticket) => {
      let key = '';
      if (grouping === 'priority') {
        key = priorityMapping[ticket.priority];
      } else if (grouping === 'status') {
        key = ticket.status; // Group by status without enforcing order
      } else if (grouping === 'user') {
        key = `${ticket.userId || 'Unknown'}`; // Group by User ID
      }

    
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
      return grouped;
    }, {});

    console.log('Grouped Keys Before Sorting:', Object.keys(grouped)); // Debugging Step

    // Handling specific grouping orders
    if (grouping === 'priority') {
      const priorityOrder = ['Urgent', 'High Priority', 'Medium Priority', 'Low Priority', 'No Priority'];
      grouped = sortGroupedByOrder(priorityOrder, grouped);
    } else if (grouping === 'user') {
      grouped = Object.keys(grouped)
        .sort((a, b) => {
          const userIdA = Number(a.split('-')[1]); // Correct extraction
          const userIdB = Number(b.split('-')[1]);
          return userIdA - userIdB; // Sort numerically
        })
        .reduce((sortedGrouped, key) => {
          sortedGrouped[key] = grouped[key];
          return sortedGrouped;
        }, {});
    }

    Object.keys(grouped).forEach((key) => {
      grouped[key] = sortTickets(grouped[key]);
    });

    return grouped;
  };

  const sortGroupedByOrder = (orderArray, grouped) => {
    return orderArray
      .filter((key) => grouped[key]) // Ensure only existing groups are included
      .reduce((sortedGrouped, key) => {
        sortedGrouped[key] = grouped[key];
        return sortedGrouped;
      }, {});
  };

  const groupedTickets = groupTickets();

 
  return (
    <div className="app">
      <header className="app-header">
  <div className="header-left">
    <button className="display-button" onClick={toggleOptions}>
      <img src={displayIcon} alt="Display Icon" className="display-icon" />
      Display
    </button>
  </div>
  <h1 className="header-title">Kanban Board Tickets</h1>
  <div className="header-right"></div> {/* Placeholder for future icons or actions */}
</header>

      {showOptions && (
        <div className="options-popup">
          <div className="dropdown-section">
            <label htmlFor="grouping-select">Grouping</label>
            <select
              id="grouping-select"
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
              <option value="">None</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label htmlFor="sorting-select">Sorting</label>
            <select
              id="sorting-select"
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="ticketId">Ticket ID</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      )}
   <div className="kanban-board">
  {Object.keys(groupedTickets).map((groupKey) => (
    <div key={groupKey} className="ticket-group">
      <div className="group-header">
        <div className="group-title">
          {/* Render Priority Icon if grouping by Priority */}
          {grouping === 'priority' && (
            <img src={priorityIcons[groupKey]} alt={groupKey} className="group-icon" />
          )}
          {/* Render Status Icon if grouping by Status */}
          {grouping === 'status' && statusIcons[groupKey] && (
              <img src={statusIcons[groupKey]} alt={groupKey} className="group-icon" />
            )}
          <h2>{groupKey}</h2>
        </div>
        <div className="group-icons">
          <img src={addIcon} alt="Add Icon" className="icon" />
          <img src={menuIcon} alt="Menu Icon" className="icon" />
        </div>
      </div>
      <div className="ticket-cards">
        {groupedTickets[groupKey].map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default App;
