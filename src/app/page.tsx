'use client';

import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Home() {
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [ageInDays, setAgeInDays] = useState<number | null>(null);
  const [ageInHours, setAgeInHours] = useState<number | null>(null);
  const [daysAfter14, setDaysAfter14] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const calculateAge = () => {
    if (birthDate && currentDate) {
      const birth = new Date(birthDate);
      const current = new Date(currentDate);

      // Calculate age in years
      let calculatedAge = current.getFullYear() - birth.getFullYear();
      const monthDiff = current.getMonth() - birth.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && current.getDate() < birth.getDate())
      ) {
        calculatedAge--;
      }

      setAge(calculatedAge);

      // Calculate age in days
      const timeDiff = current.getTime() - birth.getTime();
      const calculatedAgeInDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      setAgeInDays(calculatedAgeInDays);

      // Calculate age in hours
      const calculatedAgeInHours = Math.floor(timeDiff / (1000 * 3600));
      setAgeInHours(calculatedAgeInHours);

      // Calculate days after turning 14
      const fourteenthBirthday = new Date(birth);
      fourteenthBirthday.setFullYear(birth.getFullYear() + 14);

      let daysAfter14 = null;

      if (current > fourteenthBirthday) {
        const diffAfter14 = current.getTime() - fourteenthBirthday.getTime();
        daysAfter14 = Math.floor(diffAfter14 / (1000 * 3600 * 24));
        setDaysAfter14(daysAfter14);
      } else {
        setDaysAfter14(null);
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-screen transition-colors duration-500 ${
        darkMode
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-br from-gray-100 via-blue-100 to-gray-200 text-gray-900'
      }`}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-full focus:outline-none"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <FaSun className="text-yellow-400 w-6 h-6" />
        ) : (
          <FaMoon className="text-gray-700 w-6 h-6" />
        )}
      </button>

      <h1 className="text-4xl mb-8 font-bold">
        Welcome to Age Calculator
      </h1>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
              : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
          }`}
          required
          title="Enter your date of birth"
        />
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600'
              : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
          }`}
          required
          title="Enter the current date"
        />
        <button
          onClick={calculateAge}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Calculate Age
        </button>

        {age !== null && (
          <Transition
            show={true}
            enter="transition-opacity duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="text-2xl mt-4 space-y-2 text-center">
              <p>
                Your age is: {age} {age === 1 ? 'year' : 'years'} old
              </p>
              <p>You are {ageInDays} days old</p>
              <p>You are {ageInHours} hours old</p>
              {daysAfter14 !== null && (
                <p>
                  You have been over 14 years old for {daysAfter14}{' '}
                  {daysAfter14 === 1 ? 'day' : 'days'}
                </p>
              )}
            </div>
          </Transition>
        )}
      </div>
    </div>
  );
}
