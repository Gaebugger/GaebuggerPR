import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ isOpen, items, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="dropdown-menu" onMouseLeave={onClose}>
        {items.map((item, idx) => (
          <Link key={idx} to={item.link} className="dropdown-item">
            {item.label}
          </Link>
        ))}
      </div>
    );
  };

export default DropdownMenu;
