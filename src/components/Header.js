import './Header.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()

    const handleClick = (link) => {
        navigate(link);  
    }

    return(
        <div className="Header">
            <p className='noto-sans-normal' onClick={() => handleClick('/')}>dreamyducks</p>
            {/* Float right will make below items to be aligned right to left */}
            <button onClick={() => handleClick('/projects/EQL')}>Click here to【EQL】</button>
             <a className='noto-sans-normal' onClick={() => handleClick('/about')}>About</a>
             <a className='noto-sans-normal' onClick={() => handleClick('/projects')}>Projects</a>
             <a className='noto-sans-normal' onClick= {() => handleClick('/projects/EQL')}>Element Quick Learn</a>
        </div>
    )
}

export default Header;
