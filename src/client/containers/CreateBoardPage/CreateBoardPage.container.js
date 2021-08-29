import React, { useState } from 'react';
import AddMembers from '../AddMembersPage/AddMembersPage.container';
import { useUser } from '../../firebase/UserContext';

export default function CreateBoard() {
  const { user } = useUser();
  console.log(user);
  const userId = user[0].id;
  const [members, setMembers] = useState([userId]);
  const addMember = (id) => {
    setMembers([...members, id]);
  };
  console.log(members);
  const [showAddMembers, setshowAddMembers] = useState(false);
  const toggleShowMembers = () => {
    setshowAddMembers(!showAddMembers);
  };

  return (
    <div className="CreateBoard ">
      {console.log(user)}
      {showAddMembers && (
        <AddMembers
          members={members}
          addMember={addMember}
          userId={userId}
          toggleShowMembers={toggleShowMembers}
        />
      )}
      {!showAddMembers && (
        <div>
          Diny, your stuff goes inside here. :)
          {/* the GenericButton "add members": */}
          <button type="button" onClick={toggleShowMembers}>
            add members
          </button>
        </div>
      )}
    </div>
  );
}
