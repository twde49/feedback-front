import { useState, useRef, } from "react";
import RecordRTC from "recordrtc";
import axios from "axios";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const recorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);


  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new RecordRTC(stream, { type: "audio" });
        recorder.startRecording();
        recorderRef.current = recorder;
        setIsRecording(true);

        // AudioContext et Analyser pour visualisation
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;

        visualize(analyser);
      })
      .catch((err) => console.error("Error accessing microphone:", err));
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        uploadAudio(blob); // Envoyer pour transcription
        recorderRef.current.destroy();
        recorderRef.current = null;
      });
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setIsRecording(false);
  };

  const uploadAudio = async (audioBlob) => {
    try {
      const formData = new FormData();
      // Ajout du blob directement dans le FormData
      formData.append("file", audioBlob, "recording.wav");
      formData.append("model", "base"); // Modèle Whisper
      formData.append("language", "fr"); // Langue de l'audio
      formData.append("initial_prompt", "string"); // Prompt initial (facultatif)

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNocmlzbmEiLCJpYXQiOjE3Mzc0NjEwMjgsImV4cCI6MTczNzQ2NDYyOH0.Ilo777olNsQdGhlLkf_jBv2b3CQO9bkJ4fduvLM9yH0"; // Assurez-vous d'avoir un token valide
      const response = await axios.post(
        "https://felix.esdlyon.dev/whisper/v1/transcriptions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Si l'API nécessite un token
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Transcription :", response.data.text);
      setTranscription(response.data.text); // Affichez la transcription si tout fonctionne
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      if (error.response) {
        console.error("Réponse du serveur :", error.response.data);
      }
    }
  };

  const visualize = (analyser) => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteTimeDomainData(dataArray);

      // Effacez le canvas
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Définissez le style du canvas
      canvasCtx.fillStyle = "#f9f9f9";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#007bff";

      canvasCtx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      // Tracez les ondes
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0; // Normalisez la valeur entre 0 et 1
        const y = (v * canvas.height) / 2; // Ajustez à la hauteur du canvas

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();

      // Continuez à dessiner si l'enregistrement est actif
      if (isRecording) {
        requestAnimationFrame(draw);
      }
    };

    draw();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Whisper React System</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {/* Canvas pour visualisation des ondes */}
      <canvas
        ref={canvasRef}
        width="600"
        height="200"
        style={{
          display: "block",
          margin: "20px auto",
          border: "1px solid #ccc",
          background: "#f9f9f9",
        }}
      ></canvas>

      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default App;
