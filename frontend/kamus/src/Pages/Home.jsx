import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VantaBackground from "../Components/vanta";

export default function LandingPage() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const navigate = useNavigate();

  const handleIconClick = (page) => {
    navigate(page);
  };

  return (
    <>
      <VantaBackground></VantaBackground>
      <div className="min-h-screen text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-purple-400">Kamus</span>{" "}
              <span className="text-red-500">Bahasa Batak -</span>{" "}
              <span className="text-orange-400">Indonesia</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
              Langkah Kecil untuk Menyelami Bahasa Batak, Langkah Besar untuk
              Lestarikan Budaya.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleIconClick("/pencarian")}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                Cari Kata
              </button>
              <button
                onClick={() => handleIconClick("/terjemahkan")}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                Terjemahkan
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-7 max-w-2xl mx-auto">
            {/* First Icon */}
            <div
              className="bg-gray-500 bg-opacity-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer backdrop-filter backdrop-blur-sm transition-transform hover:scale-95"
              onMouseEnter={() => setHoveredIcon(0)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => handleIconClick("/pencarian")}
            >
              <span
                className={`material-icons text-4xl mb-2 ${
                  hoveredIcon === 0 ? "scale-110" : "scale-100"
                } transition-transform`}
              >
                search
              </span>
              <span className="text-sm text-gray-200">Cari Kata</span>
            </div>

            {/* Second Icon */}
            <div
              className="bg-gray-500 bg-opacity-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer backdrop-filter backdrop-blur-sm transition-transform hover:scale-95"
              onMouseEnter={() => setHoveredIcon(1)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => handleIconClick("/page2")}
            >
              <span
                className={`material-icons text-4xl mb-2 ${
                  hoveredIcon === 1 ? "scale-110" : "scale-100"
                } transition-transform`}
              >
                description
              </span>
              <span className="text-sm text-gray-200">Deskripsi</span>
            </div>

            {/* Third Icon */}
            <div
              className="bg-gray-500 bg-opacity-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer backdrop-filter backdrop-blur-sm transition-transform hover:scale-95"
              onMouseEnter={() => setHoveredIcon(2)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => handleIconClick("/admin")}
            >
              <span
                className={`material-icons text-4xl mb-2 ${
                  hoveredIcon === 2 ? "scale-110" : "scale-100"
                } transition-transform`}
              >
                admin_panel_settings
              </span>
              <span className="text-sm text-gray-200">Admin</span>
            </div>

            {/* Fourth Icon */}
            <div
              className="bg-gray-500 bg-opacity-50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer backdrop-filter backdrop-blur-sm transition-transform hover:scale-95"
              onMouseEnter={() => setHoveredIcon(3)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => handleIconClick("/about")}
            >
              <span
                className={`material-icons text-4xl mb-2 ${
                  hoveredIcon === 3 ? "scale-110" : "scale-100"
                } transition-transform`}
              >
                info
              </span>
              <span className="text-sm text-gray-200">Tentang</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
