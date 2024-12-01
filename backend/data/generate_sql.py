# Membaca file yang berisi kata-kata Bahasa Batak
with open('kata_batak.txt', 'r') as batak_file, open('kata_indonesia.txt', 'r') as indonesia_file:
    batak_words = batak_file.readlines()
    indonesia_words = indonesia_file.readlines()

# Membuat file SQL yang berisi perintah INSERT
with open('import_kamus.sql', 'w') as sql_file:
    for batak_word, indonesia_word in zip(batak_words, indonesia_words):
        batak_word = batak_word.strip()  # Menghapus spasi atau karakter newline
        indonesia_word = indonesia_word.strip()  # Menghapus spasi atau karakter newline
        sql_file.write(f"INSERT INTO kamus_batak (kata_batak, kata_indonesia) VALUES ('{batak_word}', '{indonesia_word}');\n")
