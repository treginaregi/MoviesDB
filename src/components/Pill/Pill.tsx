import React from 'react';
import { IPill } from './types';

const Pill: React.FC<IPill> = ({
  title,
  color,
}) => {
  return (
    <span className="text-white font-bold px-4 py-1 rounded text-sm" style={{backgroundColor: color, marginRight: "8px", color:"white"}}>
      {title}
    </span>
  );
};

export default Pill;