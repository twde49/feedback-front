import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { useMovement } from "../context/MovementContext";

const Wordcloud = () => {
  const svgRef = useRef();
  const wordsRef = useRef([]);
  const { movement } = useMovement();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (movement) {
      console.log(`Movement detected: ${movement}`);
      const delta = 100;
      setOffset((prevOffset) => {
        if (movement === "right") {
          return { ...prevOffset, x: prevOffset.x + delta };
        } else if (movement === "left") {
            return { ...prevOffset, x: prevOffset.x - delta };
        } else {
          return prevOffset;
        }
      });
    }
  }, [movement]);


  useEffect(() => {
    const updateWordCloudPosition = () => {
      d3.select(svgRef.current)
        .select("g")
        .transition()
        .duration(1000) // Smooth animation duration
        .ease(d3.easeCubicOut)
        .attr(
          "transform",
          `translate(${window.innerWidth / 2 + offset.x}, ${window.innerHeight / 2 + offset.y})`
        );
    };

    updateWordCloudPosition();
  }, [offset]);


  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.background = "radial-gradient(circle, #1d1d27, #0c0c15)";

    const width = window.innerWidth;
    const height = window.innerHeight;

    const fetchWords = async () => {
      try {
        const response = await axios.get(
          "https://de-feedback.esdlyon.dev/api/word",
          {
            lang: "fr",
          }
        );

        if (response.data.length === 0) {
          console.error("No words received from the API");
          return;
        }

        const words = response.data.map((item) => ({
          text: item.word,
          size: Math.floor(Math.random() * 30) + 20 + item.count,
        }));

        wordsRef.current = words;
        createWordCloud(words);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    const createWordCloud = (words) => {
      d3.select(svgRef.current).selectAll("*").remove();

      const layout = d3Cloud()
        .size([width, height])
        .words(words)
        .padding(20)
        .font("Orbitron")
        .fontSize((d) => d.size)
        .rotate(() => 0)
        .on("end", draw);

      layout.start();

      function draw(words) {
        const svg = d3
          .select(svgRef.current)
          .attr("viewBox", `0 0 ${width} ${height}`)
          .attr("preserveAspectRatio", "xMidYMid meet")
          .append("g")
          .attr(
            "transform",
            `translate(${width / 2 + offset.x}, ${height / 2 + offset.y})`
          );

        const textElements = svg
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", (d) => `${d.size}px`)
          .style("font-family", "Orbitron")
          .style("fill", () => getSpaceColor())
          .style("cursor","default")
          .attr("text-anchor", "middle")
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y)
          .text((d) => d.text)
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);

        animateMovement(textElements);
      }

      function animateMovement(elements) {
        elements
          .transition()
          .duration(4000)
          .ease(d3.easeLinear)
          .attr("x", (d) =>
            Math.max(
              -width / 2 + d.size,
              Math.min(width / 2 - d.size, d.x + Math.random() * 30 - 15)
            )
          )
          .attr("y", (d) =>
            Math.max(
              -height / 2 + d.size,
              Math.min(height / 2 - d.size, d.y + Math.random() * 30 - 15)
            )
          )
          .on("end", () => animateMovement(elements));
      }

      function handleMouseOver(event, d) {
        d3.select(event.target)
          .transition()
          .duration(200)
          .style("fill", "#dda20c")
          .style("font-size", `${d.size * 1.2}px`)
          .attr("x", d.x + Math.random() * 30 - 15)
          .attr("y", d.y + Math.random() * 30 - 15);
      }

      function handleMouseOut(event, d) {
        d3.select(event.target)
          .transition()
          .duration(200)
          .style("fill", getSpaceColor())
          .style("font-size", `${d.size}px`)
          .attr("x", d.x)
          .attr("y", d.y);
      }
    };

    const getSpaceColor = () => {
      const colors = ["#51557c", "#466f7c", "#ffffff", "#00c4b3", "#9370DB"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    fetchWords();

    const intervalId = setInterval(() => {
      console.log("Interval triggered every 3 seconds");
    }, 3000);

    return () => {
      clearInterval(intervalId);
      d3.select(svgRef.current).selectAll("*").interrupt();
    };
  }, [offset]);

  return (
    <svg
      ref={svgRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    ></svg>
  );
};

export default Wordcloud;
