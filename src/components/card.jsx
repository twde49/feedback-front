import "../index.css"
import logoLinkedin from "../../public/icons-linkedin.png"

const Card = ({name, classe}) => {
    return (
        <div className="p-6 max-w-[60%] mx-auto bg-white rounded-xl shadow-lg flex gap-x-4">
            <div className="flex flex-col justify-start">
                <div className="text-xl font-medium text-black">{classe}</div>
                <p className="text-slate-500">{name}</p>
            </div>
            <div className="shrink-0">
                <img className="w-12 h-12" src={logoLinkedin} alt="LinkedIn Logo" />
            </div>
        </div>
    );
}

export default Card;