import { useEffect, useState } from "react";
import Card from "./Card";

function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const initialArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

export default function GameBoard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // setCards(shuffleArray(initialArray));
    setCards(initialArray);
  }, []);

  const [selectedCardsIndex, setSelectedCardsIndex] = useState([]);
  const [removedCardsIndices, setRemovedCardsIndices] = useState([]);
  const selectCard = (index) => {
    if (selectedCardsIndex.length >= 2) return;

    setSelectedCardsIndex((prevIndices) => [...prevIndices, index]);

    if (selectedCardsIndex.length === 1) {
      const firstIndex = selectedCardsIndex[0];
      const secondIndex = index;

      if (cards[firstIndex] === cards[secondIndex]) {
        setTimeout(() => {
          setRemovedCardsIndices((prev) => [...prev, firstIndex, secondIndex]);
        }, 3000);
      }

      setTimeout(() => {
        setSelectedCardsIndex([]);
      }, 3000);
    }
  };
  return (
    <>
      <div className="board">
        {cards.map((card, index) => {
          if (removedCardsIndices.includes(index)) {
            return <div key={index}></div>;
          }
          return (
            <Card
              key={index}
              val={card}
              index={index}
              isDisabled={selectedCardsIndex.length >= 2}
              isRemoved={false}
              selectCard={selectCard}
            />
          );
        })}
      </div>
      <div className="board__removed-cards">
        {removedCardsIndices.map((index, i) => {
          return (
            <Card
              key={i}
              val={cards[index]}
              isDisabled={true}
              isDisplay={true}
            />
          );
        })}
      </div>
    </>
  );
}
