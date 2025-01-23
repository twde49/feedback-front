import  { useEffect, useRef, useState } from "react";
import * as handTrack from "handtrackjs";

const HandTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Charger le modèle Handtrack.js
    const modelParams = {
      flipHorizontal: false, // Retourne horizontalement pour les webcams
      maxNumBoxes: 3, // Limite le nombre de mains détectées
      scoreThreshold: 0.6, // Seuil de confiance pour les détections
    };

    handTrack.load(modelParams).then((loadedModel) => {
      setModel(loadedModel);
      setIsModelLoaded(true);
      console.log("Model loaded");
    });

    // Démarrer la vidéo
    handTrack.startVideo(videoRef.current).then((status) => {
      if (status) {
        console.log("Webcam started");
      } else {
        console.log("Please enable your webcam");
      }
    });

    return () => {
      // Arrêter la vidéo et libérer les ressources
      if (videoRef.current) {
        handTrack.stopVideo(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const runDetection = () => {
      if (model && videoRef.current) {
        model.detect(videoRef.current).then((predictions) => {
          console.log("Predictions: ", predictions);

          // Dessiner les prédictions sur le canvas
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          // Effacer le canvas et dessiner la vidéo
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          // Dessiner les boîtes de détection
          predictions.forEach((prediction) => {
            context.beginPath();
            context.rect(
              prediction.bbox[0],
              prediction.bbox[1],
              prediction.bbox[2],
              prediction.bbox[3]
            );
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.fillStyle = "red";
            context.stroke();
            context.fillText(
              prediction.label,
              prediction.bbox[0],
              prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
            );
          });
        });
      }
      // Continuer la détection avec requestAnimationFrame
      animationFrameId = requestAnimationFrame(runDetection);
    };

    if (isModelLoaded) {
      runDetection();
    }

    return () => {
      cancelAnimationFrame(animationFrameId); // Arrêter la détection
    };
  }, [isModelLoaded, model]);

  return (
    <div>
      <h1>Hand Tracking with Handtrack.js</h1>
      <video
        ref={videoRef}
        autoPlay
        style={{ display: "none" }}
      ></video>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
    </div>
  );
};

export default HandTracking;
