from flask import Blueprint, jsonify, request
from services.db import fetch_all_kata, add_word_to_db, search_in_db, fetch_word_detail # Tambah search_in_db untuk pencarian

search_bp = Blueprint('search', __name__)

@search_bp.route('/get_all', methods=['GET'])
def get_all_words():
    data = fetch_all_kata()
    if data is None:
        return jsonify({"error": "Gagal mengambil data"}), 500
    return jsonify(data), 200

@search_bp.route('/add_word', methods=['POST'])
def add_word():
    data = request.json
    if not data:
        return jsonify({"error": "Tidak ada data yang dikirim"}), 400

    kata_batak = data.get("kata_batak")
    kata_indonesia = data.get("kata_indonesia")
    contoh = data.get("contoh")
    frasa = data.get("frasa")

    if not kata_batak or not kata_indonesia:
        return jsonify({"error": "Kata Batak dan Indonesia diperlukan"}), 400

    # Ganti add_kata dengan add_word_to_db
    result = add_word_to_db(kata_batak, kata_indonesia, contoh, frasa)
    return jsonify({"message": result}), 200

# Endpoint baru untuk pencarian
@search_bp.route('/', methods=['GET'])
def search_words():
    query = request.args.get('q')  # Mengambil parameter 'q' dari URL
    if not query:
        return jsonify({"error": "Parameter pencarian 'q' diperlukan"}), 400

    # Panggil fungsi search_in_db untuk mencari kata sesuai dengan query
    results = search_in_db(query)

    if not results:
        # Tetap kembalikan status 200 dengan pesan hasil kosong
        return jsonify({"results": [], "message": "Kata tidak ditemukan."}), 200

    # Jika ada hasil, kembalikan data dengan status 200
    return jsonify({"results": results}), 200

@search_bp.route('/detail', methods=['GET'])
def get_word_detail():
    kata_batak = request.args.get('word', '').strip()  # Mengambil parameter 'word' dari query string
    if not kata_batak:
        return jsonify({"error": "Parameter 'word' diperlukan"}), 400

    try:
        detail = fetch_word_detail(kata_batak)  # Memanggil fungsi dari db.py
        if detail:
            return jsonify({"detail": detail}), 200  # Mengembalikan data jika ditemukan
        else:
            return jsonify({"message": "Detail kata tidak ditemukan."}), 404  # Data tidak ditemukan
    except Exception as e:
        logging.error(f"Error saat mengambil detail kata: {e}")
        return jsonify({"error": "Terjadi kesalahan pada server."}), 500