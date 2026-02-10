import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { letters } from "../assets/letters";

// استدعاء الأصوات (تأكد من وجود الملفات في public/sounds)
const successSound = "/sounds/success.mp3";
const errorSound = "/sounds/error.mp3";

// دالة مساعدة لتشغيل الصوت
const playAudio = (path: string) => {
  const audio = new Audio(path);
  audio.play().catch((e) => console.error("Audio play failed", e));
};

export default function LetterSortingGame() {
  const [currentIndex, setCurrentIndex] = useState(0); // رقم الحرف الحالي
  const [options, setOptions] = useState<any[]>([]); // الخيارات الثلاثة
  const [shake, setShake] = useState<number | null>(null); // لعمل اهتزاز عند الخطأ
  const [isCompleted, setIsCompleted] = useState(false); // حالة الفوز
  const [showConfetti, setShowConfetti] = useState(false);

  // الحرف المطلوب حالياً
  const currentLetter = letters[currentIndex];

  // 🔄 دالة تجهيز السؤال (تخلط الحرف الصحيح مع حرفين خطأ)
  useEffect(() => {
    if (!currentLetter) return;

    // 1. نبدأ بالحرف الصحيح
    let choices = [currentLetter];

    // 2. نضيف حرفين عشوائيين مختلفين
    while (choices.length < 3) {
      const random = letters[Math.floor(Math.random() * letters.length)];
      // نتأكد أن الحرف العشوائي ليس هو الحرف الصحيح ولا مكرر
      if (!choices.find((c) => c.id === random.id)) {
        choices.push(random);
      }
    }

    // 3. نخلط أماكن البطاقات
    choices = choices.sort(() => Math.random() - 0.5);
    setOptions(choices);

  }, [currentIndex]);

  // 👆 دالة الضغط على البطاقة
  const handleOptionClick = (selectedLetter: any) => {
    if (selectedLetter.id === currentLetter.id) {
      // ✅ إجابة صحيحة
      playAudio(successSound);
      
      if (currentIndex + 1 === letters.length) {
        // انتهت اللعبة
        setIsCompleted(true);
        setShowConfetti(true);
      } else {
        // ننتقل للحرف التالي ببطء قليلاً ليستوعب الطفل
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 800);
      }
    } else {
      // ❌ إجابة خاطئة
      playAudio(errorSound);
      setShake(selectedLetter.id); // تفعيل الاهتزاز
      setTimeout(() => setShake(null), 500); // إيقاف الاهتزاز
    }
  };

  // 🏆 واجهة الفوز
  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        {showConfetti && <Confetti />}
        <h1 className="text-4xl font-bold text-green-600 mb-6 animate-bounce">
          🎉 أحسنت يا بطل!
        </h1>
        <div className="text-9xl mb-6">🏆</div>
        <p className="text-xl text-gray-700 mb-8">لقد أتممت جميع الحروف بنجاح!</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-8 py-3 rounded-full text-xl shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
        >
          🔄 العب مرة أخرى
        </button>
      </div>
    );
  }

  // 🎮 واجهة اللعبة
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
      
      {/* شريط التقدم */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mb-8 overflow-hidden shadow-inner">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex) / letters.length) * 100}%` }}
        ></div>
      </div>

      {/* السؤال */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          أين حرف <span className="text-purple-600 inline-block transform hover:scale-110 transition">({currentLetter.name})</span> ؟
        </h2>
        <p className="text-gray-500">اضغط على الصورة الصحيحة</p>
      </div>

      {/* بطاقات الخيارات */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative group
              bg-white rounded-3xl p-4 shadow-xl border-4 border-transparent
              transition-all duration-200 transform hover:-translate-y-2 hover:shadow-2xl
              ${shake === option.id ? "animate-shake border-red-400 bg-red-50" : "hover:border-purple-300"}
              flex flex-col items-center justify-center aspect-square
            `}
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
