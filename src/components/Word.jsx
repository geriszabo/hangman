import React from "react";

export default function Word({ word, correctGuess }) {
  return (
    <div className="word-container flex gap-x-2 mt-20">
      {word.split("").map((e, i) => (
        <div className="border-b-4 w-14 text-center text-4xl" key={i}>

          {correctGuess.includes(e) ? <span className="animated">{e.toUpperCase()}</span> : ""}
        </div>
      ))}
    </div>
  );
}
