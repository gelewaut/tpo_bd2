# Migracion a Mongodb

### Requisitos

- Python3
- pip3
- [pipenv](https://pypi.org/project/pipenv/)

### Instalación

Parado en la carpeta mongodb ejecutar

```sh
pipenv install
```

para instalar las dependencias necesarias en el ambiente virtual

## Ejecución

```
pipenv run python csv_to_mongo.py config.json
```

## Archivos de configuracion
Un json con los parametros para setear la conexion con mongo
- database_name: nombre
- host: localhost
- port: el default de mongo es 27017