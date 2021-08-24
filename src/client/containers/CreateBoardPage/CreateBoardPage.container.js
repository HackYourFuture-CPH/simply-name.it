import React from 'react';

export const CreateBoard = () => {
  const [members, setMembers] = useState(new Set()); // tried an array too
  const updateMembers = (id) => {
    setMembers(...members, id);
  };

  return (
    <div className="CreateBoard ">
      {/* <Link to="add-members" params={(members, updateMembers)}>
        Create Idea
      </Link> */}
      <Link
        to={{
          pathname: '/add-members',
          state: { members, updateMembers },
        }}
      ></Link>
      New Board!
    </div>
  );
};
