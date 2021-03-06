import pymysql.cursors
import src.settings as settings

class DatabaseUtil:
    connection=None

    def __init__(self):
        host = settings.HOST
        username = settings.DB_USERNAME
        password = settings.DB_PASSWORD
        databaseName = settings.DB_NAME
        self.setup(host,username,password,databaseName)

    def setup(self, host, username, password, databaseName):
        self.connection = pymysql.connect(host=host,
                             user=username,
                             password=password,
                             db=databaseName,
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    def executeCUDSQL(self, sql, args=None):
        connection=self.connection
        with connection.cursor() as cursor:
            cursor.execute(sql, args)

        id = connection.insert_id()
        connection.commit()
        return id

    def retrieve(self, sql, args=None):
        connection=self.connection
        with connection.cursor() as cursor:
            cursor.execute(sql, args)
        result = cursor.fetchall()
        return result
        
    def __del__(self):
        """closes the connection
        """
        self.connection.close()

