import React from "react";

export default function PopUp({ isPlaying, errors, texts, playHandler }) {
  return (
    <div
      className={`popUp-container ${
        isPlaying && `hidden`
      } absolute top-50 left-50 bg-gray-100/40 backdrop-blur-sm h-screen w-screen`}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div
            className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full ${texts.color}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="white"
              className="w-16 h-16"
            >
              {errors >= 5 ? texts.lose.icon : texts.win.icon}
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {errors >= 5 ? texts.lose.modalHeader : texts.win.modalHeader}
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {errors >= 5 ? texts.lose.modalBody : texts.win.modalBody}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className={`px-4 py-2 bg-gray-400 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300`}
              onClick={playHandler}
            >
              Play again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
