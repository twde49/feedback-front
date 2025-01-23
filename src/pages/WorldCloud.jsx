import { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

const WordCloud = () => {
  const svgRef = useRef();
  const wordsRef = useRef([]); // Garde les mots en mémoire

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.background = 'radial-gradient(circle, #1d1d27, #0c0c15)'; // couleur du fond

    const width = window.innerWidth;
    const height = window.innerHeight;

    const fetchWords = async () => {
      try {
        const response = await axios.get('https://de-feedback.esdlyon.dev/api/word', {
          lang: 'fr',
        });

        if (response.data.length === 0) {
          console.error("Aucun mot reçu de l'API");
          return;
        }

        const words = response.data.map((item) => ({
          text: item.word,
          size: Math.floor(Math.random() * 30) + 20 + item.count,
        }));

        wordsRef.current = words; // Met à jour les mots en mémoire
        createWordCloud(words);
      } catch (error) {
        console.error("Erreur lors du chargement des mots :", error);
      }
    };

    const createWordCloud = (words) => {
      d3.select(svgRef.current).selectAll('*').remove();

      const layout = d3Cloud()
          .size([width, height])
          .words(words)
          .padding(20)
          .font('Orbitron')
          .fontSize((d) => d.size) // Taille des mots
          .rotate(() => 0) // Pas de rotation
          .on('end', draw);

      layout.start();

      function draw(words) {
        const svg = d3
            .select(svgRef.current)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const textElements = svg
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', (d) => `${d.size}px`)
            .style('font-family', 'Orbitron')
            .style('fill', () => getSpaceColor())
            .attr('text-anchor', 'middle')
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y)
            .text((d) => d.text)
            .on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut);

        animateMovement(textElements);
      }

      function animateMovement(elements) {
        elements
            .transition()
            .duration(4000) // Plus lent pour l'effet de flottement
            .ease(d3.easeLinear)
            .attr('x', (d) =>
                Math.max(
                    -width / 2 + d.size,
                    Math.min(width / 2 - d.size, d.x + Math.random() * 30 - 15)
                )
            )
            .attr('y', (d) =>
                Math.max(
                    -height / 2 + d.size,
                    Math.min(height / 2 - d.size, d.y + Math.random() * 30 - 15)
                )
            )
            .on('end', () => animateMovement(elements)); // Boucle infinie pour flotter
      }

      function handleMouseOver(event, d) {
        d3.select(event.target)
            .transition()
            .duration(200)
            .style('fill', '#dda20c')
            .style('font-size', `${d.size * 1.2}px`) // Agrandit légèrement
            .attr('x', d.x + Math.random() * 30 - 15) // Déplace légèrement horizontalement
            .attr('y', d.y + Math.random() * 30 - 15); // Déplace légèrement verticalement
      }

      function handleMouseOut(event, d) {
        d3.select(event.target)
            .transition()
            .duration(200)
            .style('fill', getSpaceColor()) // Retour à la couleur initiale
            .style('font-size', `${d.size}px`) // Retour à la taille initiale
            .attr('x', d.x) // Retour à la position initiale
            .attr('y', d.y); // Retour à la position initiale
      }
    };

    const getSpaceColor = () => {
      const colors = ['#51557c', '#466f7c', '#ffffff', '#00c4b3', '#9370DB'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    fetchWords();

    // Intervalle toutes les 3 secondes (modifiez l'action ici si nécessaire)
    const intervalId = setInterval(() => {
      console.log('Interval triggered every 3 seconds');
      // Vous pouvez ajouter une autre action ici
    }, 3000);

    // Nettoyage à la fin
    return () => {
      clearInterval(intervalId); // Arrête l'intervalle
      d3.select(svgRef.current).selectAll('*').interrupt(); // Arrête toutes les animations
    };
  }, []);

  return <svg ref={svgRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}></svg>;
};

export default WordCloud;
