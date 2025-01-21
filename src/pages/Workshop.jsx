
//import '../App.css'
import  '../assets/css/workshop.css'
import { useParams } from 'react-router-dom';

function App() {

    function ZoomInWorkshop() {

        const { id } = useParams();

        const workshops = [
            { title: 'Mapping', content: 'Je suis mapping', id: 1 },
            { title: 'Sceno', content: 'Je suis Sceno', id: 2 },
            { title: 'Dome', content: 'Je suis Dome', id: 3 },
            { title: 'Reflet parallèle', content: 'Je suis Reflet parallèle',  id: 4 },
            { title: 'AR Game', content: 'Je suis AR Game',  id: 5 },
            { title: 'Réalité virtuelle', content: 'Je suis VR',  id: 6 },
            { title: 'Vidéo inside', content: 'Je suis Vidéo inside',  id: 7 },
            { title: 'Live stream', content: 'Je suis Live stream',  id: 8 },
            { title: 'Design interaction', content: 'Je suis Design interaction',  id: 9 },
            { title: 'Dev app', content: 'Je suis Dev app',  id: 10 },
        ];


        const workshop = workshops.find((workshop) => workshop.id === parseInt(id));

        return (
            <div className="zoom-details">
                <h2 className="zoom-title">
                    {workshop.title}
                </h2>
                <p className="zoom-content">
                    {workshop.content}
                </p>
            </div>
        );
    }
    return (
        <>
            <div className="banner"></div>
            <div className="zoom-container">
                <ZoomInWorkshop />
            </div>
        </>
        )
    }

export default App
