import WordCloud from './WorldCloud.jsx';

const App = () => {
    const words = [
        { text: 'React', size: 40 },
        { text: 'Vite', size: 30 },
        { text: 'JavaScript', size: 50 },
        { text: 'D3', size: 60 },
        { text: 'WordCloud', size: 20 },
        { text: 'React', size: 40 },
        { text: 'Vite', size: 30 },
        { text: 'JavaScript', size: 50 },
        { text: 'D3', size: 60 },
        { text: 'WordCloud', size: 20 },
        { text: 'React', size: 40 },
        { text: 'Vite', size: 30 },
        { text: 'JavaScript', size: 50 },
        { text: 'D3', size: 60 },
        { text: 'WordCloud', size: 20 },
        { text: 'React', size: 40 },
        { text: 'Vite', size: 30 },
        { text: 'JavaScript', size: 50 },
        { text: 'D3', size: 60 },
        { text: 'WordCloud', size: 20 },
    ];

    return (
        <div>
            <WordCloud words={words} />
        </div>
    );
};

export default App;
