// ListWithTitle.jsx

import React from 'react';

const Credits = ({ title, items }) => {
const listLength = items.length;
  return (
    <div className="credit">
      <div className='creditTitle'>{title}</div>
      <ul className='creditList'>
        {Array.from({ length: listLength }, (_, index) => (
          <li className='creditItem' key={index}>{items[index]}</li>
        ))}
      </ul>
    </div>
  );
};

export default Credits;
