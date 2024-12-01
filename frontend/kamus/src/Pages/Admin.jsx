import axios from "axios";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";

export default function KamusDigitalAdmin() {
  const [kataList, setKataList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    katabatak: "",
    definisi: "",
    contohKalimatBahasaBatak: "",
    contohkalimatBahasaIndonesia: "",
  });
  const [formErrors, setFormErrors] = useState({ kata: "", definisi: "" });
  const [error, setError] = useState(null); // State untuk menampung error

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/get_words"
        );
        if (response.status === 200) {
          setKataList(response.data); // Mengisi kataList dengan data dari API
        }
      } catch (err) {
        setError("Tidak dapat mengambil data dari server");
      }
    }

    fetchData();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { kata: "", definisi: "" };

    if (!formData.katabatak.trim()) {
      newErrors.kata = "Kata bahasa Batak harus diisi";
      isValid = false;
    }
    if (!formData.definisi.trim()) {
      newErrors.definisi = "Kata bahasa Indonesia harus diisi";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editingId) {
        // Update existing data
        setKataList(
          kataList.map((item) =>
            item.id === editingId ? { ...item, ...formData } : item
          )
        );
      } else {
        try {
          const response = await axios.post("http://localhost:5000/admin/add", {
            kata_batak: formData.katabatak,
            kata_indonesia: formData.definisi,
            contoh_kalimat_batak: formData.contohKalimatBahasaBatak,
            contoh_kalimat_indonesia: formData.contohkalimatBahasaIndonesia,
          });
          if (response.status === 201) {
            setKataList([...kataList, { id: Date.now(), ...formData }]); // Add new word to list
          }
        } catch (error) {
          console.error("Error adding data: ", error);
        }
      }
      setIsDialogOpen(false);
      setFormData({
        katabatak: "",
        definisi: "",
        contohKalimatBahasaBatak: "",
        contohkalimatBahasaIndonesia: "",
      });
      setEditingId(null);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      katabatak: item.kata_batak,
      definisi: item.kata_indonesia,
      contohKalimatBahasaBatak: item.contoh_kalimat_batak,
      contohkalimatBahasaIndonesia: item.contoh_kalimat_indonesia,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/delete/${id}`
      );
      if (response.status === 200) {
        setKataList(kataList.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const filteredKataList = kataList.filter((item) => {
    const kata = item.kata_batak ? item.kata_batak.toLowerCase() : "";
    const definisi = item.kata_indonesia
      ? item.kata_indonesia.toLowerCase()
      : "";
    return (
      kata.includes(searchTerm.toLowerCase()) ||
      definisi.includes(searchTerm.toLowerCase())
    );
  });

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Kamus Digital</h1>

      <div className="flex justify-between mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari kata atau definisi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={() => {
            setFormData({
              katabatak: "",
              definisi: "",
              contohKalimatBahasaBatak: "",
              contohkalimatBahasaIndonesia: "",
            });
            setEditingId(null);
            setIsDialogOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus className="inline-block mr-2 h-4 w-4" /> Tambah Kata
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Kata bahasa batak</th>
            <th className="py-3 px-6 text-left">Kata bahasa indonesia</th>
            <th className="py-3 px-6 text-left">Contoh Kalimat Bahasa Batak</th>
            <th className="py-3 px-6 text-left">
              Contoh Kalimat Bahasa Indonesia
            </th>
            <th className="py-3 px-6 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredKataList.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{item.kata_batak}</td>
              <td className="py-3 px-6 text-left">{item.kata_indonesia}</td>
              <td className="py-3 px-6 text-left">
                {item.contoh_kalimat_batak}
              </td>
              <td className="py-3 px-6 text-left">
                {item.contoh_kalimat_indonesia}
              </td>
              <td className="py-3 px-6 text-right">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Kata" : "Tambah Kata Baru"}
              </h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form untuk Kata */}
              <div>
                <label
                  htmlFor="katabatak"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kata bahasa Batak
                </label>
                <input
                  type="text"
                  id="katabatak"
                  value={formData.katabatak}
                  onChange={(e) =>
                    setFormData({ ...formData, katabatak: e.target.value })
                  }
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formErrors.kata && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.kata}</p>
                )}
              </div>

              {/* Form untuk Kata Bahasa Indonesia */}
              <div>
                <label
                  htmlFor="definisi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kata bahasa Indonesia
                </label>
                <input
                  type="text"
                  id="definisi"
                  value={formData.definisi}
                  onChange={(e) =>
                    setFormData({ ...formData, definisi: e.target.value })
                  }
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formErrors.definisi && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.definisi}
                  </p>
                )}
              </div>

              {/* Form untuk Contoh Kalimat Batak */}
              <div>
                <label
                  htmlFor="contohKalimatBahasaBatak"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contoh Kalimat Bahasa Batak
                </label>
                <input
                  type="text"
                  id="contohKalimatBahasaBatak"
                  value={formData.contohKalimatBahasaBatak}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contohKalimatBahasaBatak: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Form untuk Contoh Kalimat Bahasa Indonesia */}
              <div>
                <label
                  htmlFor="contohkalimatBahasaIndonesia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contoh Kalimat Bahasa Indonesia
                </label>
                <input
                  type="text"
                  id="contohkalimatBahasaIndonesia"
                  value={formData.contohkalimatBahasaIndonesia}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contohkalimatBahasaIndonesia: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {editingId ? "Simpan Perubahan" : "Tambah Kata"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
