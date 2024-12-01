from flask import Blueprint, request, jsonify
from services.db import add_word_to_db, fetch_all_kata, delete_word_from_db  # Import fungsi delete_word_from_db

# Definisikan Blueprint terlebih dahulu
admin_bp = Blueprint('admin', __name__)

# Definisikan endpoint untuk mendapatkan semua kata
@admin_bp.route('/get_words', methods=['GET'])
def get_words():
    try:
        results = fetch_all_kata()
        if not results:  # Jika hasil kosong
            return jsonify({"error": "Tidak ada data ditemukan"}), 404
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Definisikan endpoint untuk menambahkan kata baru
@admin_bp.route('/add', methods=['POST'])
def add_word():
    data = request.json
    print("Data yang diterima:", data)  # Log untuk memeriksa data yang diterima

    kata_batak = data.get('kata_batak')
    kata_indonesia = data.get('kata_indonesia')

    try:
        # Pastikan untuk memanggil fungsi dengan benar
        add_word_to_db(kata_batak, kata_indonesia)
        return jsonify({'message': 'Kata berhasil ditambahkan.'}), 201
    except Exception as e:
        print(f"Error saat menambahkan kata: {str(e)}")  # Log kesalahan
        return jsonify({"error": str(e)}), 500

# Definisikan endpoint untuk menghapus kata
@admin_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete_word(id):
    try:
        result = delete_word_from_db(id)
        if result:
            print(f"Word with ID {id} deleted successfully.")
            return jsonify({"message": "Kata berhasil dihapus"}), 200
        else:
            print(f"Word with ID {id} not found.")
            return jsonify({"error": "Kata tidak ditemukan"}), 404
    except Exception as e:
        print(f"Error saat menghapus kata dengan ID {id}: {str(e)}")  # Log kesalahan
        return jsonify({"error": str(e)}), 500
