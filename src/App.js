import React, { useEffect, useState } from 'react';
import './App.css';
import GameFrame from './components/GameFrame';

function App() {
  const cardImages = [
    { src: "./img/card1.png", matched: false },
    { src: "./img/card2.png", matched: false },
    { src: "./img/card3.png", matched: false },
    { src: "./img/card4.png", matched: false },
    { src: "./img/card5.png", matched: false },
    { src: "./img/card6.png", matched: false },
    { src: "./img/card7.png", matched: false },
    { src: "./img/card8.png", matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [choice, setChoice] = useState();
  const [secondChoice, setSecondChoice] = useState();
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
  };

  const handleChoice = (card) => {
    choice ? setSecondChoice(card) : setChoice(card);
  };

  const choiceReset = () => {
    setChoice();
    setSecondChoice();
    setDisabled(false);
  };

  const removeMatchedPairs = () => {
    setCards((prevCards) => prevCards.filter((card) => !card.matched));
  };

  useEffect(() => {
    if (choice && secondChoice) {
      setDisabled(true);
      if (choice.src === secondChoice.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choice.src ? { ...card, matched: true } : card
          )
        );
        setTimeout(() => {
          choiceReset();
          removeMatchedPairs();
        }, 1412);
      } else {
        console.log("no match");
        setTimeout(choiceReset, 1412);
      }
    }
  }, [choice, secondChoice]);

  return (
    <div className="App">
      <h1>Einfaches Memory Game</h1>
      <button onClick={shuffleCards}>Shuffle!</button>
      <button onClick={removeMatchedPairs}>Remove!</button>

      <div className="card-grid">
        {cards.map((card) => (
          <GameFrame
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice || card === secondChoice || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
