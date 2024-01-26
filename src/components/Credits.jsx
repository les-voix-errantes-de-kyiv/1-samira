// ListWithTitle.jsx

import React from 'react';

const Credits = ({ title, items }) => {
const listLength = items.length;
  return (
    <div className="credit">
      <h2 className='creditTitle'>{title}</h2>
      <ul className='creditList'>
        {Array.from({ length: listLength }, (_, index) => (
          <li className='creditItem' key={index}>{items[index]}</li>
        ))}
      </ul>
    </div>
  );
};

export default Credits;
