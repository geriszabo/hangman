import "./App.css";
import React, { useState, useEffect } from "react";

import Figure from "./components/Figure";
import Header from "./components/Header";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import PopUp from "./components/PopUp";

import { checkWin } from "./components/CheckWin";

const WORDS = ["react", "tailwind", "javascript", "hireme", "employed"];

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [errors, setErrors] = useState(0);
  const [word, setWord] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [correctGuess, setCorrectGuesss] = useState([]);
  const [wrongGuess, setWrongtGuesss] = useState([]);

  const texts = {
    win: {
      modalHeader: "You won",
      modalBody: "You are a smart one ain't ya?!",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
        />
      ),
    },
    lose: {
      modalHeader: "You lost",
      modalBody: (
        <span>
          Cheer up, it's okay to lose. Btw the solution was{" "}
          <span className="font-bold">{word}</span>
        </span>
      ),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
        />
      ),
    },
    color: `bg-gradient-to-r ${
      errors >= 5 ? "from-red-100 to-red-400" : "from-yellow-100 to-yellow-400"
    }`,
  };

  const playHandler = () => {
    setIsPlaying(true);
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setErrors(0);
    setCorrectGuesss([]);
    setWrongtGuesss([]);
  };

  useEffect(() => {
    const handleKeyEvents = (e) => {
      if (
        e.key.match(/[A-Za-zöüóőúéáű]/) &&
        isPlaying &&
        !e.key.match("Enter") &&
        !e.key.match("Shift") &&
        !e.key.match("Meta") &&
        !e.key.match("ArrowDown") &&
        !e.key.match("ArrowUp") &&
        !e.key.match("ArrowLeft") &&
        !e.key.match("ArrowRight") &&
        !e.key.match("Alt") &&
        !e.key.match("Backspace") &&
        !e.key.match("Shift")
      ) {
        if (word.includes(e.key) && !correctGuess.includes(e.key)) {
          setCorrectGuesss([...correctGuess, e.key]);
        } else if (!word.includes(e.key) && !wrongGuess.includes(e.key)) {
          setWrongtGuesss([...wrongGuess, e.key]);
          setErrors((preverrors) => preverrors + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyEvents);
    if (
      checkWin(correctGuess, wrongGuess, word) === "win" ||
      checkWin(correctGuess, wrongGuess, word) === "lose"
    ) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 500);
    }

    return () => window.removeEventListener("keydown", handleKeyEvents);
  }, [isPlaying, correctGuess, wrongGuess]);

  return (
    <div className="App min-h-full flex justify-between">
      <Header></Header>
      <div className="game-container px-20 min-w-full flex justify-between">
        <Figure errors={errors}></Figure>
        <WrongLetters wrongGuess={wrongGuess}></WrongLetters>
      </div>
      <PopUp
        isPlaying={isPlaying}
        wrongGuess={wrongGuess}
        errors={errors}
        texts={texts}
        playHandler={playHandler}
      ></PopUp>
      <Word word={word} correctGuess={correctGuess}></Word>
    </div>
  );
}

export default App;
