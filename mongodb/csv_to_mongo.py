import pandas as pd
from pymongo import MongoClient
import json
import sys

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
    with open(f"{sys.argv[1]}", "r") as f:
        config = json.load(f)
    database_name = config["database_name"]
    host = config["host"]
    port = config["port"]

    print("Lineas Importadas")
    document_count = mongoimport("./e01_telefono.csv", database_name, "telefonos", host, port)
    print(f'Telefonos: {document_count}')
    document_count = mongoimport("./e01_cliente.csv", database_name, "clientes", host, port)
    print(f'Clientes: {document_count}')
    document_count = mongoimport("./e01_factura.csv", database_name, "facturas", host, port)
    print(f'Facturas: {document_count}')
    document_count = mongoimport("./e01_detalle_factura.csv", database_name, "detalle_factura", host, port)
    print(f'Detalle Facturas: {document_count}')
    document_count = mongoimport("./e01_producto.csv", database_name, "producto", host, port)
    print(f'Productos: {document_count}')