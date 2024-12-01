import mysql.connector

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",      #  host database 
            user="root",           # user database 
            password="dp269346",   #password database 
            database="kamus_batak_indonesia" # database 
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
