import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

const WordCloud = ({ words }) => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 1440;
        const height = 800;

        // Efface le contenu précédent
        d3.select(svgRef.current).selectAll('*').remove();

        // Crée le nuage de mots
        const layout = d3Cloud()
            .size([width, height])
            .words(
                words.map((word) => ({
                    text: word.text,
                    size: word.size,
                    x: 0,
                    y: 0,
                }))
            )
            .padding(5)
            .font('Poppins') // Utilise la police Poppins
            .fontSize((d) => Math.sqrt(d.size) * 10 + 10) // Taille relative dynamique
            .rotate(() => 0) // Tous les mots restent horizontaux
            .on('end', draw);

        layout.start();

        function draw(words) {
            const svg = d3
                .select(svgRef.current)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            const textElements = svg
                .selectAll('text')
                .data(words)
                .enter()
                .append('text')
                .style('font-size', (d) => `${d.size}px`)
                .style('font-family', 'Poppins') // Définit la police ici aussi
                .style('fill', () => getSpaceColor()) // Couleurs initiales
                .attr('text-anchor', 'middle')
                .attr('x', (d) => d.x)
                .attr('y', (d) => d.y)
                .text((d) => d.text);

            // Ajoute des animations de pulsation
            animatePulse(textElements);
            animateColors(textElements);
        }

        // Fonction pour générer des couleurs dans le thème de l'espace
        function getSpaceColor() {
            const colors = [
                '#001f3f', // Bleu profond
                '#3D59AB', // Bleu étoilé
                '#483D8B', // Violet sombre
                '#000000', // Noir (espace)
                '#1E90FF', // Bleu ciel
                '#9370DB', // Lavande sombre
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        // Animation pour changer les couleurs des mots
        function animateColors(elements) {
            elements
                .transition()
                .duration(2000) // Temps pour changer les couleurs
                .style('fill', () => getSpaceColor())
                .on('end', () => animateColors(elements)); // Boucle infinie
        }

        // Animation pour "pulsation" des tailles
        function animatePulse(elements) {
            elements
                .transition()
                .duration(1500) // Durée d'une pulsation
                .ease(d3.easeSinInOut) // Mouvement fluide
                .style('font-size', (d) => `${d.size * 1.2}px`) // Agrandir la taille
                .transition()
                .duration(1500)
                .ease(d3.easeSinInOut)
                .style('font-size', (d) => `${d.size}px`) // Revenir à la taille normale
                .on('end', () => animatePulse(elements)); // Boucle infinie
        }
    }, [words]);

    return <svg ref={svgRef}></svg>;
};

export default WordCloud;
