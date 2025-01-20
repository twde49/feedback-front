
import '../App.css'

function App() {
    const ateliers = [
        { title: 'Mapping',  id: 1 },
        { title: 'Sceno',  id: 2 },
        { title: 'Dome',  id: 3 },
        { title: 'Reflet parallèle',  id: 4 },
        { title: 'AR Game',  id: 5 },
        { title: 'Réalité virtuelle',  id: 6 },
        { title: 'Vidéo inside',  id: 7 },
        { title: 'Live stream',  id: 8 },
        { title: 'Design interaction',  id: 9 },
        { title: 'Dev app',  id: 10 },
    ];

    function ShoppingList() {
        const listItems = ateliers.map(atelier =>
                <div key={atelier.id}
                     style={{
                         border: '1px solid black',
                         display: 'flex',
                         flexDirection: 'row',
                         width: '20%',
                         height: '20%',
                         justifyContent: 'center',
                     }}
                >
                    <span
                        key={atelier.id}
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        {atelier.title}
                    </span>
                </div>
        );

        return (
            <div
                style={{
                    border: '1px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90vh',
                    justifyContent: 'center',
                }}
            >
                <span>{listItems}</span>
            </div>

        );
    }

    return (
        <>
            <ShoppingList/>
        </>
    )
}

export default App