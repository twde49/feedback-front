
//import '../App.css'
import '../index.css';
import  '../assets/css/workshop.css';
import { useParams } from 'react-router-dom';
import logoLinkedin from "../../public/icons-linkedin.png";

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
                <h2 className="zoom-title text-3xl font-bold px-10 py-5">
                    {workshop.title}
                </h2>
                <p className="zoom-content">
                    {workshop.content}
                </p>
            </div>



        );
    }

    function participant(){
        const participants = [
            { id : 1, name: "Malakaya", class: "b2dev" },
            { id : 2, name: "Pierre", class: "b2dev" },
            { id : 3, name: "Raphael", class: "b2dev" },
            { id : 4, name: "Mey", class: "b2dev" },
        ];

        return (
            <div>
                {participants.map((participant, index) => {
                    return(
                        <div key={index} className="p-6 max-w-[60%] mx-auto bg-white rounded-xl shadow-lg flex gap-x-4 my-5">
                            <div className="flex flex-col justify-start">
                                <div className="text-xl font-medium text-black">{participant.name}</div>
                                <p className="text-slate-500">{participant.class}</p>
                            </div>
                            <div className="shrink-0">
                                <img className="w-12 h-12" src={logoLinkedin} alt="LinkedIn Logo" />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <>
            <div className={"workshop-container"}>
                <div className="text-center p-5">
                    <ZoomInWorkshop />
                </div>
                <div className="participant-container mt-10">
                    {participant()}
                </div>
            </div>
        </>
    );
}

export default App
