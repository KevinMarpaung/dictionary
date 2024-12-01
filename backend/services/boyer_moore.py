
def boyer_moore_search(pattern, text):
    """
    Mencari substring pattern dalam text menggunakan algoritma Boyer-Moore.
    """
    m = len(pattern)
    n = len(text)

    if  m== 0 or n == 0:
        return False

    # Membuat tabel bad character heuristic
    bad_char = {}
    for i in range(m):
        bad_char[pattern[i]] = i

    # Melakukan pencarian
    s = 0  # Posisi awal pencarian
    while s <= n - m:
        j = m - 1

        # Cocokkan pola dari kanan ke kiri
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1

        # Jika ditemukan kecocokan
        if j < 0:
            return True  # Pattern ditemukan sebagai substring
        else:
            # Geser sesuai bad character heuristic
            shift = j - bad_char.get(text[s + j], -1)
            s += max(1, shift)

    return False
