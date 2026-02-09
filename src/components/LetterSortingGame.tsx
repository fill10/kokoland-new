// change test
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

import { letters } from "../assets/letters";
import { playLetterSound } from "../assets/letterSounds";
<<<<<<< HEAD
const successSound = "/sounds/success.mp3";
const errorSound = "/sounds/error.mp3";
=======

// ✅ التصحيح: الإشارة للملفات داخل public مباشرة بدون كلمة public
const successSound = "/sounds/success.mp3";
const errorSound = "/sounds/error.mp3";

const totalLevels = letters.length;
// ... باقي الكود كما هو

import { letters } from "../assets/letters";
import { playLetterSound } from "../assets/letterSounds";
import successSound from "/public/sounds/success.mp3";
import errorSound from "/public/sounds/error.mp3";

>>>>>>> 7f1933b7873080f5d20ce5fdbbc42bc1d714d666
const totalLevels = letters.length;

export default function LetterSortingGame() {
  const [level, setLevel] = useState(0);
  const [target, setTarget] = useState(letters[0]);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTarget(letters[level]);
  }, [level]);

  const playSuccess = () => new Audio(successSound).play();
  const playError = () => new Audio(errorSound).play();

  function handleChoice(letter: any) {
    if (letter.id === target.id) {
      playLetterSound(letter.id);
      playSuccess();

      if (level + 1 === totalLevels) {
        setCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);
      } else {
        setLevel(level + 1);
      }
    } else {
      playError();
    }
  }

  const progress = Math.round(((level + 1) / totalLevels) * 100);

  return (
    <div className="p-6 text-center">
      {showConfetti && <Confetti />}

      <h1 className="text-2xl font-bold mb-4">
        🧩 اختر الحرف الصحيح
      </h1>

      {/* Progress */}
      <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
        <div
          className="bg-green-500 h-6 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!completed ? (
        <>
          {/* Target */}
          <div className="mb-6">
            <img
              src={target.image}
              alt={target.name}
              className="w-32 h-32 mx-auto"
            />
            <p className="mt-2 text-xl font-bold">
              أين حرف {target.name}؟
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {letters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => handleChoice(letter)}
                className="bg-white rounded-xl shadow hover:scale-105 transition p-2"
              >
                <img
                  src={letter.image}
                  alt={letter.name}
                  className="w-16 h-16 mx-auto"
                />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            🎉 أكملت جميع الحروف!
          </h2>

          <button
            onClick={() => {
              const name = prompt("✍️ اكتب اسم الطفل:");
              if (!name) return;

              const w = window.open("", "_blank");
              w!.document.write(`
                <h1 style="text-align:center">🏅 شهادة إنجاز</h1>
                <h2 style="text-align:center">${name}</h2>
                <p style="text-align:center">
                أكمل لعبة كوكو وأصدقاء الحروف بنجاح
                </p>
                <script>window.print()</script>
              `);
              w!.document.close();
            }}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg animate-bounce"
          >
            🖨️ طباعة الشهادة
          </button>
        </div>
      )}
    </div>
  );
}
س
