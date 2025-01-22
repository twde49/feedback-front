const NavBar = () => {
    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: '#1d1d27',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 1000,
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src="./src/assets/esd.png"
                    alt="Logo"
                    style={{ height: '30px', marginRight: '20px' }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <a
                    href="#wordcloud"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontFamily: 'Orbitron, sans-serif',
                        transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#00c4b3')}
                    onMouseLeave={(e) => (e.target.style.color = 'white')}
                >
                    WordCloud
                </a>
                <a
                    href="#workshops"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontFamily: 'Orbitron, sans-serif',
                        transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#00c4b3')}
                    onMouseLeave={(e) => (e.target.style.color = 'white')}
                >
                    List Workshops
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
