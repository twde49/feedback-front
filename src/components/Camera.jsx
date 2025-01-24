import { useEffect, useRef, useState } from "react";
import * as handTrack from "handtrackjs";
import { useMovement } from "../context/MovementContext";


export const Camera = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [model, setModel] = useState(null);
    const [prevPosition, setPrevPosition] = useState(null);
    const [movementCooldown, setMovementCooldown] = useState(false);
    const { setMovement } = useMovement();

    useEffect(() => {
        if (movementCooldown) {
            const timeout = setTimeout(() => {
                setMovementCooldown(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [movementCooldown]);

    useEffect(() => {
        const modelParams = {
            flipHorizontal: false,
            imageScaleFactor: .2,
            maxNumBoxes: 1,
            iouThreshold: 0.5,
            scoreThreshold: 0.80,
            modelSize: "large",
            modelType: "ssd640fpnlite",
        };

        handTrack.load(modelParams).then((loadedModel) => {
            setModel(loadedModel);
            setIsModelLoaded(true);
        });

        handTrack.startVideo(videoRef.current).then((status) => {
            if (!status) {
                console.error("no status");
            }
        });

        return () => {
            if (videoRef) {
                handTrack.stopVideo(videoRef).then((status) => {
                    console.log(status);
                });
            }
        };
    }, []);

    useEffect(() => {
        let animationFrameId;
        const detectLargeMovements = (prevX, currentX) => {
            if (!movementCooldown && prevX !== null) {
                const movement = currentX - prevX;
                if (Math.abs(movement) > 100) {
                    setMovement(movement > 0 ? "right" : "left");
                    setMovementCooldown(true);
                }else {
                    console.log('cool');
                }
            }
        };

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
                        context.fillStyle = "red";
                        context.stroke();
                        context.fillText(
                            prediction.label,
                            prediction.bbox[0],
                            prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
                        );

                        detectLargeMovements(prevPosition, prediction.bbox[0]);
                        setPrevPosition(prediction.bbox[0]);
                    });
                });
            }
            animationFrameId = requestAnimationFrame(runDetection);
        };

        if (isModelLoaded) {
            runDetection();
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isModelLoaded, model, movementCooldown, prevPosition]);

    return (
        <div>
            <video hidden={false} ref={videoRef} autoPlay style={{ display: "none" }}></video>
            <canvas hidden={false} ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
        </div>
    );
};

export default Camera;