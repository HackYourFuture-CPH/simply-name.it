import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown/Dropdown.component';

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
            return <Member member={member} key={member.userId} />;
          })
        )}
      </ul>
    </div>
  );
}

const Member = ({ member }) => {
  const [visibility, setVisibility] = useState(false);
  const closeDropdown = () => {
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };
  return (
    <li key={member.userId} id={member.userId}>
      <div className="modal-members">
        <div className="modal-body">
          <img className="round" src={member.photoUrl} alt="member" />
          <div className="profile">
            <h4>{member.fullName}</h4>
            <p className="caption">{member.role}</p>
          </div>
        </div>
        <Dropdown visible={visibility} variant="light" onClick={closeDropdown}>
          <p>Remove</p>
        </Dropdown>
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
