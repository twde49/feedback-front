import { useEffect, useRef } from "react";
import cloud from "d3-cloud";

const WordCloud = () => {
    const canvasRef = useRef(null);

    function getFuturisticColor() {
        // Palette futuriste/espace
        const colors = [
            "#00FFFF", // Cyan
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    useEffect(() => {
        const words = [
            { text: "Multivers", size: 50 },
            { text: "Dimension", size: 40 },
            { text: "Réalité", size: 35 },
            { text: "Parallèle", size: 40 },
            { text: "Univers", size: 45 },
            { text: "Portail", size: 30 },
            { text: "Futur", size: 25 },
            { text: "Altérité", size: 35 },
            { text: "Fiction", size: 30 },
            { text: "Quantum", size: 40 },
            { text: "Énergie", size: 25 },
            { text: "Trou de ver", size: 45 },
            { text: "Antimatière", size: 30 },
            { text: "Spatio-temporel", size: 35 },
            { text: "Illusion", size: 25 },
            { text: "Convergence", size: 30 },
            { text: "Simulation", size: 25 },
            { text: "Exoplanète", size: 35 },
            { text: "Expansion", size: 30 },
            { text: "Collapsus", size: 40 },
            { text: "Fractale", size: 30 },
            { text: "Uchronie", size: 25 },
            { text: "Métamonde", size: 40 },
            { text: "Hyperespace", size: 35 },
            { text: "Entrelacement", size: 25 },
            { text: "Déplacement", size: 30 },
            { text: "Espace-temps", size: 45 },
            { text: "Résonance", size: 25 },
            { text: "Alternative", size: 35 },
            { text: "Infini", size: 40 },
        ];

        const layout = cloud()
            .size([1000, 700])
            .words(words)
            .padding(15) // Espacement entre les mots
            .rotate(() => 0) // Toujours horizontal
            .fontSize((d) => d.size)
            .on("end", draw);

        layout.start();

        function draw(words) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            // Efface le canvas
            context.clearRect(0, 0, canvas.width, canvas.height);

            words.forEach((word) => {
                context.save();
                context.font = `${word.size}px serif`;
                context.fillStyle = getFuturisticColor();
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.translate(word.x + canvas.width / 2, word.y + canvas.height / 2);

                // Définir une animation zoom/dézoom
                let scale = 1;
                let growing = true;

                function animate() {
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    // Met à jour le scale
                    if (growing) {
                        scale += 0.02;
                        if (scale >= 1.2) growing = false;
                    } else {
                        scale -= 0.02;
                        if (scale <= 1) growing = true;
                    }

                    // Dessiner les mots avec scale
                    words.forEach((w) => {
                        context.save();
                        context.translate(w.x + canvas.width / 2, w.y + canvas.height / 2);
                        context.scale(w === word ? scale : 1, w === word ? scale : 1);
                        context.font = `${w.size}px serif`;
                        context.fillStyle = getFuturisticColor();
                        context.fillText(w.text, 0, 0);
                        context.restore();
                    });

                    requestAnimationFrame(animate);
                }

                animate(); // Lancer l'animation
                context.restore();
            });
        }
    }, []);

    return <canvas ref={canvasRef} width={1000} height={700} />;
};

export default WordCloud;
