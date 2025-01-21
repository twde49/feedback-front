import { motion } from "framer-motion";

// Données des mots avec leurs tailles
const words = [
  { text: "React", size: 90 },
  { text: "JavaScript", size: 30 },
  { text: "CSS", size: 20 },
  { text: "HTML", size: 15 },
  { text: "Web", size: 25 },
];

// Vérifier le chevauchement entre deux mots
const doesOverlap = (rect1, rect2) => {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

// Générer des positions aléatoires sans chevauchement
const generateNonOverlappingPositions = (words, containerWidth, containerHeight) => {
  const positions = [];
  const maxAttempts = 1000;

  words.forEach((word) => {
    let position;
    let attempts = 0;
    do {
      const x = Math.random() * (containerWidth - word.size);
      const y = Math.random() * (containerHeight - word.size);
      const rect = {
        left: x,
        right: x + word.size,
        top: y,
        bottom: y + word.size,
      };
      position = { x, y, rect };
      attempts++;
    } while (
      attempts < maxAttempts &&
      positions.some((pos) => doesOverlap(pos.rect, position.rect))
      );

    positions.push(position);
  });

  return positions.map((pos) => ({ x: pos.x, y: pos.y }));
};

// Composant principal
const WordCloud = () => {
  const containerWidth = 600;
  const containerHeight = 400;

  // Générer des positions non chevauchantes
  const positions = generateNonOverlappingPositions(
    words,
    containerWidth,
    containerHeight
  );

  return (
    <div
      style={{
        position: "relative",
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        border: "1px solid #ccc",
        overflow: "hidden",
        margin: "auto", // Centrer le conteneur sur la page
        background: "#f9f9f9",
      }}
    >
      {words.map((word, index) => (
        <motion.div
          key={index}
          initial={{ x: positions[index].x, y: positions[index].y }}
          animate={{
            x: [
              positions[index].x + Math.random() * 50 - 25,
              positions[index].x - Math.random() * 50 + 25,
            ],
            y: [
              positions[index].y + Math.random() * 50 - 25,
              positions[index].y - Math.random() * 50 + 25,
            ],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            position: "absolute",
            fontSize: `${word.size}px`,
            fontWeight: "bold",
            color: `hsl(${Math.random() * 360}, 70%, 50%)`,
          }}
        >
          {word.text}
        </motion.div>
      ))}
    </div>
  );
};

export default WordCloud;
