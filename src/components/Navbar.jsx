const NavBar = () => {
    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: '#1d1d27',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                zIndex: 1000,
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
            }}
        >
            <img
                src="./src/assets/esd.png"
                alt="Logo"
                style={{ height: '30px', marginRight: '20px' }}
            />
        </nav>
    );
};

export default NavBar;
