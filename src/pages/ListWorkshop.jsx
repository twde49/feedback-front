import '../index.css';
import '../assets/css/listWorkshop.css';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getWorkshop() {
        try {
            const response = await axios.get("https://de-feedback.esdlyon.dev/api/workshop");
            setWorkshops(response.data); // Mettre à jour l'état avec les ateliers récupérés
            setLoading(false); // Indiquer que le chargement est terminé
        } catch (error) {
            console.error("Erreur lors de la récupération des ateliers :", error);
            setLoading(false); // Indiquer que le chargement est terminé même en cas d'erreur
        }
    }

    useEffect(() => {
        getWorkshop();
    }, []);

    function WorkshopList() {
        if (loading) {
            return <p>Chargement des ateliers...</p>;
        }

        if (workshops.length === 0) {
            return <p>Aucun atelier disponible pour le moment.</p>;
        }

        const listItems = workshops.map(workshop => (
            <Link
                to={`/workshops/${workshop.id}`}
                className="workshop-item bg-white text-black font-bold size-fit flex flex-col rounded-lg p-2 justify-center items-center border-2 h-1/4 w-1/5 border-transparent"
                key={workshop.id}
            >
                <div
                    className="titre flex size-1/4 justify-center items-center w-full"
                >
                    {workshop.name}
                </div>

                <div
                    className="flex size-3/4 w-full rounded-lg"
                >
                    <p className="text workshop-description">{workshop.description}</p>
                    {/*<img className="size-full" src="../../public/snail.jpeg" alt="image" />*/}
                </div>
            </Link>
        ));

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
                    <WorkshopList />
                </div>
            </div>
        </>
    );
}

export default App;
