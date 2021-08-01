import React from 'react';

export default function AdminPanel() {
  return (
    <div className="modal-content">
      <div className="modal-body">
        <img
          className="round"
          src="https://randomuser.me/api/portraits/men/79.jpg"
          alt="member"
        />
        <div className="profile">
          <h3>Jacop Jones</h3>
          <p className="caption">Admin</p>
        </div>
      </div>
    </div>
  );
}
