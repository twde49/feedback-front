
//import '../App.css'
import '../index.css';
import  '../assets/css/enzo.css'

import {Link} from "react-router-dom";

function App() {
    const workshops = [
        { title: 'Mapping',content: 'Je suis mapping',  id: 1 },
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
        const listItems = workshops.map(workshop =>
                <div key={workshop.id}
                     className="workshop-item flex flex-row rounded-lg p-3 justify-center items-center"
                >
                    <Link to={`/enzo/${workshop.id}`}
                        className="workshop-link"
                        key={workshop.id}
                    >
                        {workshop.title}
                    </Link>
                </div>
        );

        return (
                <div className="workshop-list flex h-2/4 justify-center items-center">{listItems}</div>
        );
    }

    return (
        <>
            <div className="workshop-container container flex h-screen justify-items-center">
                <ShoppingList/>
            </div>

        </>
    )


}

export default App