import React from 'react';
import members from './membersData.json';

export default function MembersPanel() {
  return (
    <div className="members-wrapper">
      <ul>
        {members.length === 0 ? (
          <h2>No members</h2>
        ) : (
          members.map((member) => {
            return (
              <li key={member.id} id={member.id}>
                <div className="modal-members">
                  <div className="modal-body">
                    <img className="round" src={member.photo} alt="member" />
                    <div className="profile">
                      <h3>{member.name}</h3>
                      <p className="caption">{member.role}</p>
                    </div>
                  </div>
                  <div className="dropdown" />
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
