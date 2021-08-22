import React from 'react';

export const CreateBoard = () => {
  const [members, setMembers] = useState(new Set());
  const updateMembers = (id) => {
    setMembers(...members, id);
  };

  return (
    <div className="CreateBoard ">
      <Link to="add-member" params={(members, updateMembers)}>
        Create Idea
      </Link>
      New Board!
    </div>
  );
};
