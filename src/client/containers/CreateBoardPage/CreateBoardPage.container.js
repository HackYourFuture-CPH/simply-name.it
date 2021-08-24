import React, { useState } from 'react';
import AddMembers from '../AddMembersPage/AddMembersPage.container';

export default function CreateBoard() {
  const [members, setMembers] = useState([]);
  const updateMembers = (id) => {
    setMembers([...members, id]);
  };
  const [showAddMembers, setshowAddMembers] = useState(false);
  const toggleShowMembers = () => {
    setshowAddMembers(!showAddMembers);
  }; //show members and pass it

  return (
    <div className="CreateBoard ">
      {showAddMembers && (
        <AddMembers
          members={members}
          updateMembers={updateMembers}
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
