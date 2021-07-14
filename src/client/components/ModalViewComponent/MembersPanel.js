import React from 'react';
import PropTypes from 'prop-types';

export default function MembersPanel({ members }) {
  return (
    <div className="members-wrapper">
      <ul>
        {members.length === 0 ? (
          <li className="no-member-wrapper">
            <h2>No members</h2>
          </li>
        ) : (
          members.map((member) => {
            return <Member member={member} key={member.id} />;
          })
        )}
      </ul>
    </div>
  );
}

const Member = ({ member }) => {
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
};

MembersPanel.propTypes = {
  members: PropTypes.instanceOf(Object).isRequired,
};

Member.propTypes = {
  member: PropTypes.instanceOf(Object).isRequired,
};
