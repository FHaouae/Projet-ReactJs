import React from 'react';
//container-fluid text-center text-md-left
const Footer = () => {
    return (
        <div className='footer'>
            <footer className="bg-dark text-white text-center py-3">
                <div className="container">
                    <p className="mb-0">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;


