import logging
import mysql.connector
from services.boyer_moore import boyer_moore_search

# Konfigurasi logging
logging.basicConfig(level=logging.INFO)

# Fungsi untuk membuat koneksi ke database
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',  # Ganti dengan host database Anda
            user='root',       # Ganti dengan username database Anda
            password='dp269346',  # Ganti dengan password database Anda
            database='kamus-batak'  # Ganti dengan nama database Anda
       
        )
        return connection
    except mysql.connector.Error as err:
        logging.error(f"Error saat membuat koneksi database: {err}")
        return None

# Fungsi untuk mengambil semua kata dari database
def fetch_all_kata():
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        if connection is None:
            raise Exception("Tidak dapat terhubung ke database.")
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM kata")
        results = cursor.fetchall()
        return results
    except Exception as e:
        logging.error(f"Error saat mengambil semua kata: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# Fungsi untuk menambahkan kata baru ke database
def add_word_to_db(kata_batak, arti):
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        if connection is None:
            raise Exception("Tidak dapat terhubung ke database.")
        
        cursor = connection.cursor()
        query = """
            INSERT INTO kata (kata_batak, arti)
            VALUES (%s, %s)
        """
        cursor.execute(query, (kata_batak, arti))
        connection.commit()
        logging.info("Kata berhasil ditambahkan ke database.")
        return "Kata berhasil ditambahkan"
    except Exception as e:
        if connection:
            connection.rollback()  # Rollback jika ada kesalahan
        logging.error(f"Error saat menambahkan kata ke database: {e}")
        return "Gagal menambahkan kata"
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


# Fungsi untuk mencari kata dalam database menggunakan algoritma Boyer-Moore
def search_in_db(query):
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        if connection is None:
            raise Exception("Tidak dapat terhubung ke database.")
        
        # Ambil semua data dari database
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM kata")
        all_data = cursor.fetchall()

        # Gunakan Boyer-Moore untuk pencocokan query
        results = []
        for row in all_data:
            if boyer_moore_search(query, row['kata_batak']) or boyer_moore_search(query, row['arti']):
                results.append(row)

        return results
    except Exception as e:
        logging.error(f"Error saat mencari di database: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# Fungsi untuk menghapus kata dari database berdasarkan ID
def delete_word_from_db(id):
    connection = None
    cursor = None
    try:
        # Membuat koneksi ke database
        connection = get_db_connection()
        if connection is None:
            raise Exception("Tidak dapat terhubung ke database.")

        # Menghapus kata berdasarkan ID
        cursor = connection.cursor()
        query = "DELETE FROM kata WHERE id = %s"
        cursor.execute(query, (id,))
        connection.commit()
        
        # Mengembalikan True jika ada baris yang dihapus
        if cursor.rowcount > 0:
            logging.info(f"Kata dengan ID {id} berhasil dihapus.")
            return True
        else:
            logging.warning(f"Tidak ada kata dengan ID {id} yang ditemukan.")
            return False
    except Exception as e:
        if connection:
            connection.rollback()  # Melakukan rollback jika terjadi kesalahan
        logging.error(f"Error saat menghapus kata dari database: {e}")
        return False
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()



def fetch_word_detail(kata_batak):
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        if connection is None:
            raise Exception("Tidak dapat terhubung ke database.")
        
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM kata WHERE kata_batak = %s"
        cursor.execute(query, (kata_batak,))
        result = cursor.fetchone()  # Mengambil satu hasil
        return result
    except Exception as e:
        logging.error(f"Error saat mengambil detail kata: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
