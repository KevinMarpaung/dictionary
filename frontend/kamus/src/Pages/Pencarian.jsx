import React, { useState } from "react";
import Navbar from "../Fragments/Navbar";

const Pencarian = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // Untuk hasil pencarian
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error
  const [isLoading, setIsLoading] = useState(false); // Indikator loading
  const [selectedWordId, setSelectedWordId] = useState(null); // ID kata yang sedang dilihat detailnya
  const [details, setDetails] = useState({}); // Objek untuk menyimpan detail kata

  // Fungsi untuk menangani pencarian
  const handleSearch = async () => {
    if (!query.trim()) {
      setErrorMessage("Masukkan kata untuk pencarian.");
      setResults([]);
      return;
    }

    setIsLoading(true); // Aktifkan indikator loading
    try {
      const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results.slice(0, 5)); // Batasi hasil maksimal 5
        setErrorMessage("");
      } else {
        setResults([]);
        setErrorMessage(data.message || "Kata tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error searching:", error);
      setErrorMessage("Terjadi kesalahan saat mencari. Coba lagi nanti.");
    } finally {
      setIsLoading(false); // Matikan indikator loading
    }
  };

  // Fungsi untuk mengambil detail kata
  const fetchWordDetail = async (word, id) => {
    // Jika kata yang sama diklik, sembunyikan detailnya
    if (selectedWordId === id) {
      setSelectedWordId(null); // Menyembunyikan detail
      return;
    }

    // Jika kata baru diklik, ambil detailnya
    setSelectedWordId(id);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/search/detail?word=${word}`
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.detail) {
        setDetails((prevDetails) => ({
          ...prevDetails,
          [id]: data.detail, // Simpan detail kata berdasarkan ID
        }));
        setErrorMessage("");
      } else {
        setErrorMessage("Detail kata tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error fetching word detail:", error);
      setErrorMessage("Terjadi kesalahan saat mengambil detail kata.");
    }
  };

  return (
    <>
      <div className="bg-slate-300 text-black h-screen">
        <div className="p-4">
          <input
            className="w-1/2 p-2 rounded-md mt-2 text-black border border-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kata..."
          />
          <button
            onClick={handleSearch}
            className="bg-green-400 p-2 w-1/4 ml-2 rounded-sm text-black font-bold"
          >
            Cari
          </button>
        </div>

        {/* Pesan Error */}
        {errorMessage && (
          <div className="text-red-500 font-bold mt-4 text-center">
            {errorMessage}
          </div>
        )}

        {/* Indikator Loading */}
        {isLoading && (
          <div className="text-blue-500 font-bold mt-4 text-center">
            Memuat data...
          </div>
        )}
        <div className="flex  flex-row">
          <div className="flex w-full mx-4 mt-4">
            {/* Daftar Hasil Pencarian */}
            <div className="bg-white w-full p-4 rounded-md shadow-lg">
              <ul className="text-black">
                {results.map((result) => (
                  <li key={result.id} className="my-3">
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        fetchWordDetail(result.kata_batak, result.id)
                      }
                    >
                      <p className="p-2 my-2">
                        <strong>Bahasa Batak:</strong> {result.kata_batak}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Div untuk Menampilkan Detail Kata */}
          {selectedWordId && details[selectedWordId] && (
            <div className="flex w-full  mt-4">
              <div className="bg-white  p-4 rounded-md shadow-lg">
                <h2 className="text-lg font-bold mb-2">Detail Kata</h2>
                <p>
                  <strong>Bahasa Batak:</strong>{" "}
                  {details[selectedWordId].kata_batak}
                </p>
                <p>
                  <strong>Arti:</strong> {details[selectedWordId].arti}
                </p>
                <p>
                  <strong>Contoh Kalimat (Batak):</strong>{" "}
                  {details[selectedWordId].contoh_kalimat_batak ||
                    "Tidak ada contoh tersedia."}
                </p>
                <p>
                  <strong>Contoh Kalimat (Indonesia):</strong>{" "}
                  {details[selectedWordId].contoh_kalimat_indonesia ||
                    "Tidak ada contoh tersedia."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pencarian;
