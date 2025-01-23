import { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import axios from "axios";
import * as qs from "postcss";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const recorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);

  const API_URL = "https://felix.esdlyon.dev";

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem("token");
      if (token && checkTokenValidity(token)) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
        await login();
      }
    };

    initializeApp();
  }, []);

  const uploadAudio = async (audioBlob) => {
    const ensureTokenValid = async () => {
      let token = localStorage.getItem("token");
      if (!token || !checkTokenValidity(token)) {
        localStorage.removeItem("token");
        await login();
        token = localStorage.getItem("token"); // Récupérer le nouveau token après login
      }
      return token;
    };

    try {
      const token = await ensureTokenValid();
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");
      formData.append("model", "base");
      formData.append("language", "fr");

      const response = await axios.post(`${API_URL}/whisper/v1/transcriptions`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
// Créer une fonction et lui passer response.data.text
      let responseApi = await fetchWords(response.data.text);

      console.log(responseApi);

      console.log("Transcription:", response.data.text);
      setTranscription(response.data.text);
    } catch (error) {
      console.error("Error uploading audio:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  const login = async () => {
    const  username ="chrisna";
    const password ="vE9Ljm7VCjseX";
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      console.log("Login successful.");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const checkTokenValidity = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      console.log(payload)

      return payload.exp > currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new RecordRTC(stream, { type: "audio" });
        recorder.startRecording();
        recorderRef.current = recorder;
        setIsRecording(true);

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
        uploadAudio(blob);
        recorderRef.current.destroy();
        recorderRef.current = null;
      });
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setIsRecording(false);
  };


  const visualize = (analyser) => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = "#f9f9f9";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#007bff";

      canvasCtx.beginPath();
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();

      if (isRecording) {
        requestAnimationFrame(draw);
      }
    };

    draw();
  };


  const fetchWords = async (word) => {
    const URL = "https://de-feedback.esdlyon.dev";
    console.log("Payload envoyé :", word);

    let data = {
      "sentence": word,
    };

    try {
      const response = await axios.post(`${URL}/api/wordcloud`, data);
      console.log("Réponse :", response);
      return response;
    } catch (err) {
      console.error("Erreur lors de la requête :", err.response ? err.response.data : err.message);
    }
  };




  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>

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
    </div>
  );
};

export default App;
