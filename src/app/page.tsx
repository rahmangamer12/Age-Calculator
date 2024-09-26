'use client';

import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import BackgroundNumbers from './BackgroundNumbers';

export default function Home() {
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
  } | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const calculateAge = () => {
    if (birthDate && currentDate) {
      const birth = new Date(birthDate);
      const current = new Date(currentDate);

      let years = current.getFullYear() - birth.getFullYear();
      let months = current.getMonth() - birth.getMonth();
      let days = current.getDate() - birth.getDate();

      if (days < 0) {
        months -= 1;
        days += new Date(current.getFullYear(), current.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const timeDiff = current.getTime() - birth.getTime();
      const hours = Math.floor(timeDiff / (1000 * 3600));

      setAge({ years, months, days, hours });
    }
  };

  const speakAge = () => {
    if (age) {
      const message = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen w-screen overflow-hidden transition-colors duration-500 ${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 text-gray-900'
      }`}
    >
      {/* Background Numbers */}
      <BackgroundNumbers darkMode={darkMode} />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full focus:outline-none transform hover:scale-110 transition-transform duration-300 z-10"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <FaSun className="text-yellow-400 w-6 h-6" />
        ) : (
          <FaMoon className="text-gray-700 w-6 h-6" />
        )}
      </button>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 font-bold animate-pulse z-10 text-center px-4">
        Welcome to Age Calculator
      </h1>

      <div className="flex flex-col items-center space-y-6 z-10 w-full max-w-md px-4">
        {/* Date of Birth Input */}
        <div className="flex flex-col items-start w-full">
          <label
            htmlFor="birthDate"
            className="mb-2 text-lg font-medium animate-fade-in"
          >
            Enter Date of Birth
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
              darkMode
                ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
            }`}
            required
            title="Enter your date of birth"
          />
        </div>

        {/* Current Date Input */}
        <div className="flex flex-col items-start w-full">
          <label
            htmlFor="currentDate"
            className="mb-2 text-lg font-medium animate-fade-in"
          >
            Enter Current Date
          </label>
          <input
            id="currentDate"
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
              darkMode
                ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
            }`}
            required
            title="Enter the current date"
          />
        </div>

        {/* Calculate Age Button */}
        <button
          onClick={calculateAge}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transform hover:scale-105 transition duration-300"
        >
          Calculate Age
        </button>

        {age && (
          <>
            {/* Age Display with Animation */}
            <Transition
              show={true}
              enter="transition-opacity duration-700"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <div className="text-xl sm:text-2xl mt-6 space-y-4 text-center animate-slide-in px-4">
                <p>
                  You are{' '}
                  <span className="font-semibold">
                    {age.years} {age.years === 1 ? 'year' : 'years'}
                  </span>
                  ,{' '}
                  <span className="font-semibold">
                    {age.months} {age.months === 1 ? 'month' : 'months'}
                  </span>
                  , and{' '}
                  <span className="font-semibold">
                    {age.days} {age.days === 1 ? 'day' : 'days'}
                  </span>{' '}
                  old.
                </p>
              </div>
            </Transition>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mt-15">
              <button
                onClick={speakAge}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transform hover:scale-105 transition duration-300"
              >
                Tell Me My Age
              </button>
              <button
                onClick={() => alert(`You are ${age.years} years old.`)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transform hover:scale-105 transition duration-300"
              >
                Show Years
              </button>
              <button
                onClick={() =>
                  alert(`You are ${age.months + age.years * 12} months old.`)
                }
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
              >
                Show Months
              </button>
              <button
                onClick={() =>
                  alert(
                    `You are ${
                      age.days + age.months * 30 + age.years * 365
                    } days old.`
                  )
                }
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transform hover:scale-105 transition duration-300"
              >
                Show Days
              </button>
              <button
                onClick={() => alert(`You are ${age.hours} hours old.`)}
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transform hover:scale-105 transition duration-300"
              >
                Show Hours
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
