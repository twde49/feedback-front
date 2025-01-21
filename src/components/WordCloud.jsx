import { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

const WordCloud = () => {
    const svgRef = useRef();

    useEffect(() => {
        const width = window.innerWidth; // Largeur de l'écran
        const height = window.innerHeight; // Hauteur de l'écran

        // Fonction pour récupérer les mots depuis Random Word API
        const fetchWords = async () => {
            try {
                const response = await axios.get('https://random-word-api.herokuapp.com/word', {
                    params: { number: 30 }, // Obtenir 30 mots aléatoires
                    lang: 'fr',
                });

                const words = response.data.map((word, index) => ({
                    text: word,
                    size: Math.floor(Math.random() * 30) + 20 + index, // Taille aléatoire entre 20 et 50
                }));
                createWordCloud(words);
            } catch (error) {
                console.error('Erreur lors du chargement des mots :', error);
            }
        };

        // Fonction pour créer le nuage de mots
        const createWordCloud = (words) => {
            d3.select(svgRef.current).selectAll('*').remove();

            const layout = d3Cloud()
                .size([width, height])
                .words(words)
                .padding(20) // Augmente l'espacement pour éviter les chevauchements
                .font('Poppins')
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
                    .style('font-family', 'Poppins')
                    .style('fill', () => getSpaceColor())
                    .attr('text-anchor', 'middle')
                    .attr('x', (d) => d.x)
                    .attr('y', (d) => d.y)
                    .text((d) => d.text)
                    .on('mouseover', handleMouseOver) // Effet au survol
                    .on('mouseout', handleMouseOut);  // Retour à la normale

                // Animation
                animateMovement(textElements);
            }

            function getSpaceColor() {
                const colors = [
                    '#001f3f',
                    '#3D59AB',
                    '#483D8B',
                    '#000000',
                    '#1E90FF',
                    '#9370DB',
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            function animateMovement(elements) {
                elements
                    .transition()
                    .duration(4000) // Plus lent
                    .ease(d3.easeLinear)
                    .attr('x', (d) => Math.max(-width / 2 + d.size, Math.min(width / 2 - d.size, d.x + Math.random() * 30 - 15)))
                    .attr('y', (d) => Math.max(-height / 2 + d.size, Math.min(height / 2 - d.size, d.y + Math.random() * 30 - 15)))
                    .on('end', () => animateMovement(elements)); // Boucle infinie
            }

            function handleMouseOver(event, d) {
                d3.select(event.target)
                    .transition()
                    .duration(200)
                    .style('fill', '#dda20c') // Change la couleur
                    .style('font-size', `${d.size * 1}px`) // Agrandit légèrement
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

        // Appel de l'API pour récupérer les mots
        fetchWords();
    }, []);

    return <svg ref={svgRef} style={{ width: '100%', overflow: 'hidden' }}></svg>;
};

export default WordCloud;
