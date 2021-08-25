import React, { useState } from 'react';
import AddMembers from '../AddMembersPage/AddMembersPage.container';

export default function CreateBoard() {
  const [members, setMembers] = useState([]);
  const addMember = (id) => {
    setMembers([...members, id]);
  };
  const [showAddMembers, setshowAddMembers] = useState(false);
  const toggleShowMembers = () => {
    setshowAddMembers(!showAddMembers);
  };

  return (
    <div className="CreateBoard ">
      {showAddMembers && (
        <AddMembers
          members={members}
          addMember={addMember}
          toggleShowMembers={toggleShowMembers}
        />
      )}
      {!showAddMembers && (
        <div>
          Diny, your stuff goes inside here. :)
          {/* the GenericButton "add members": */}
          <button onClick={toggleShowMembers}>add members</button>
        </div>
      )}
    </div>
  );
}
