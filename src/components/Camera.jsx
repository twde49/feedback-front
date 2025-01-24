import {useEffect, useRef, useState} from "react";
import * as handTrack from "handtrackjs";
import {useMovement} from "../context/MovementContext";

export const Camera = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [model, setModel] = useState(null);
    const [movementCooldown, setMovementCooldown] = useState(false);
    const {setMovement} = useMovement();
    const prevPositionRef = useRef(null);

    useEffect(() => {
        const modelParams = {
            flipHorizontal: false,
            imageScaleFactor: 0.8,
            maxNumBoxes: 1,
            iouThreshold: 0.3,
            scoreThreshold: 0.85,
            modelType: "ssd640fpnlite",
            modelSize: "large",
        };

        handTrack.load(modelParams).then((loadedModel) => {
            setModel(loadedModel);
            setIsModelLoaded(true);
        });

        handTrack.startVideo(videoRef.current).then((status) => {
            if (!status) {
                console.error("Video not started");
            }
        });

        return () => {
            handTrack.stopVideo(videoRef.current).then(() => {
                console.log("Video stopped");
            });
        };
    }, []);

    const detectLargeMovements = (currentX) => {
        const movementThreshold = 20;
        if (!movementCooldown && prevPositionRef.current !== null) {
            const movement = currentX - prevPositionRef.current;
            if (Math.abs(movement) > movementThreshold) {
                setMovement(movement > 0 ? "left" : "right");
                setMovementCooldown(true);
                setTimeout(() => setMovementCooldown(false), 1000);
            }
        }
        prevPositionRef.current = currentX;
    };

    useEffect(() => {
        let animationFrameId;

        const runDetection = () => {
            if (model && videoRef.current) {
                model.detect(videoRef.current).then((predictions) => {
                    const canvas = canvasRef.current;
                    const context = canvas.getContext("2d");

                    canvas.width = videoRef.current.videoWidth;
                    canvas.height = videoRef.current.videoHeight;

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

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
                        context.stroke();

                        detectLargeMovements(prediction.bbox[0]);
                    });
                });
            }
            animationFrameId = requestAnimationFrame(runDetection);
        };

        if (isModelLoaded) {
            runDetection();
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isModelLoaded, model, movementCooldown]);

    return (
        <div>
            <video hidden={false} ref={videoRef} autoPlay style={{display: "none"}}></video>
            <canvas hidden={false} ref={canvasRef} style={{border: "1px solid black"}}></canvas>
        </div>
    );
};

export default Camera;
