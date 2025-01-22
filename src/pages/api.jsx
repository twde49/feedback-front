import '../index.css';
import axios from "axios";

const App = () => {
    async function getWorkshop(){
        try {
            const response = await axios.get("https://de-feedback.esdlyon.dev/api/workshop")
            console.log("click")
            console.log(response.data)
            const workshops = response.data
        } catch (error) {
            console.log(error)
        }
    }

    async function getParticipants(){
        try {
            const response = await axios.get("https://de-feedback.esdlyon.dev/api/participant/all")
            console.log("click")
            console.log(response.data)
            const participants = response.data
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <>
          <button className={"rounded-full m-20 bg-red-600 p-2"} onClick={getWorkshop} >
              Get Workshop
          </button>

          <button className={"rounded-full m-20 bg-red-600 p-2"} onClick={getParticipants} >
              Get Participants
          </button>
      </>
    );
}

export default App;