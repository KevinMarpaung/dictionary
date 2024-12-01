import React from "react";
import {
  Book,
  Award,
  Mail,
  Linkedin,
  Twitter,
  FileText,
  Users,
} from "lucide-react";
import Navbar from "../Fragments/Navbar";

export default function KevinMarpaungProfile() {
  return (
    <>
      <Navbar></Navbar>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Kevin Marpaung</h1>
              <p className="text-xl">Informatika| 210504044</p>
            </div>
            <img
              src="/placeholder.svg?height=150&width=150"
              alt="Kevin Marpaung"
              className="rounded-full border-4 border-white shadow-lg w-32 h-32 object-cover"
            />
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Profil Singkat</h2>
            <p className="text-gray-700 leading-relaxed">
              saya adalah seorang mahasiswa informatika diuniversitas samudra
              yang sedang melakukan penelitian tentang penerapan algoritma boyer
              moore pada fitur pencarian aplikasi kamus bahasa batak-indonesia
              tugas akhir ini adalah salah satu syarat untuk menentukan
              kelulusan mahasiswa diuniversitas samudra
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="mr-2 text-blue-600" />
                Area Penelitian
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Rekayasa Perangkat Lunak</li>
                <li>String Mathching</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Award className="mr-2 text-blue-600" />
                Pencapaian
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <span className="font-semibold">2023:</span> Penghargaan
                  Peneliti Muda Terbaik dari Kementerian Riset dan Teknologi
                </li>
                <li>
                  <span className="font-semibold">2022:</span> Grant Penelitian
                  Internasional untuk Proyek AI dalam Perubahan Iklim
                </li>
                <li>
                  <span className="font-semibold">2021:</span> Best Paper Award
                  di Konferensi Internasional Machine Learning
                </li>
                <li>
                  <span className="font-semibold">2020:</span> Paten untuk
                  Algoritma Deteksi Anomali berbasis Deep Learning
                </li>
              </ul>
            </section>
          </div>

          <section className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Users className="mr-2 text-blue-600" />
              Kolaborasi dan Kontak
            </h2>
            <p className="text-gray-700 mb-4">
              Kevin Marpaung aktif berkolaborasi dengan peneliti dari berbagai
              institusi di seluruh dunia. Jika Anda tertarik untuk berkolaborasi
              atau memiliki pertanyaan tentang penelitiannya, jangan ragu untuk
              menghubungi:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:kevin.marpaung@email.com"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Mail className="mr-2" /> kevin.marpaung@email.com
              </a>
              <a
                href="https://www.linkedin.com/in/kevinmarpaung"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Linkedin className="mr-2" /> LinkedIn
              </a>
              <a
                href="https://twitter.com/kevinmarpaung"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Twitter className="mr-2" /> Twitter
              </a>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Kevin Marpaung. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
