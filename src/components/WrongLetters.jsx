import React from "react";

export default function WrongLetters({ wrongGuess }) {
  return (
    <div className="wrong-letters-container ">
        {wrongGuess.length > 0 && <h3 className="text-4xl mb-4 animated">Nope:</h3>}
        <div className="grid grid-cols-3 gap-4 h-16">

      {wrongGuess.map((e, i) => (
        <p key={i} className="animated mr-4 text-2xl">
          {e.toUpperCase()},
        </p>
      ))}
        </div>
    </div>
  );
}
