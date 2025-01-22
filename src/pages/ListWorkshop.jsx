
//import '../App.css'
import '../index.css';
import  '../assets/css/listWorkshop.css';
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

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



    function WorkshopList() {
        const listItems = workshops.map(workshop =>
            <Link to={`/enzo/${workshop.id}`}
                  className="workshop-item text-2xl bg-[#C16499] text-black font-bold size-fit flex flex-col rounded-lg p-2 justify-center items-center border-2 h-1/2 w-1/4 border-transparent"
                  key={workshop.id}
            >
                <div key={workshop.id}
                     className="titre flex size-1/4 justify-center items-center w-full"
                >
                    {workshop.title}
                </div>

                <div key={workshop.id}
                     className="flex size-3/4 w-full rounded-lg"
                >
                    <img className="size-full" src="../../public/snail.jpeg" alt="image" />
                </div>
            </Link>
        );

        return (
            <div className="workshop-list flex h-full justify-center items-center flex-row flex-wrap gap-14 ">
                {listItems}
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col w-full justify-center items-center h-full">
                <div className="workshop-container container sm: flex h-screen justify-center items-center pt-28">
                    <WorkshopList/>
                </div>

            </div>
        </>
    )


}

export default App