import pandas as pd
from pymongo import MongoClient
import json

def mongoimport(csv_path, db_name, coll_name, db_url='localhost', db_port=27017):
    """ Imports a csv file at path csv_name to a mongo colection
    returns: count of the documants in the new collection
    """
    client = MongoClient(db_url, db_port)
    db = client[db_name]
    coll = db[coll_name]
    data = pd.read_csv(csv_path)
    payload = json.loads(data.to_json(orient='records'))
    coll.delete_many({})
    coll.insert_many(payload)
    return coll.count_documents({})

if __name__ == "__main__":
    csv_file_path = '/Users/juaarias/Documents/bases_2/tpo_bd2/e01_telefono.csv'  # Reemplaza esto con la ruta real de tu archivo CSV
    database_name = 'tpo_bd2'
    collection_name = 'telefono'

    document_count = mongoimport(csv_file_path, database_name, collection_name)
    print(document_count)
