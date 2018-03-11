import configparser
import pymysql.cursors
class DatabaseUtil:
    connection=None;

    def __init__(self):
        """reads setup.ini configuration file and
        initializes the connection
        """
        config = configparser.ConfigParser()
        config.read('setup.ini')
        host=config['database']['host']
        username=config['database']['username']
        password=config['database']['password']
        databaseName=config['database']['database']
        self.setup(host,username,password,databaseName)

    def setup(self, host, username, password, databaseName):
        """initialize the connection
        """
        self.connection = pymysql.connect(host=host,
                             user=username,
                             password=password,
                             db=databaseName,
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    def executeCUDSQL(self, sql, args=None):
        """executes sql related to insert, update or delete
        the sql argument takes the sql with optional arguments
        argument can be a tuple or list
        """
        connection=self.connection
        with connection.cursor() as cursor:
            cursor.execute(sql, args)
        connection.commit()

    def retrieve(self, sql, args=None):
        """executes sql related to selection or retrieval
        the sql argument takes the sql with optional arguments
        argument can be a tuple or list
        """
        connection=self.connection
        with connection.cursor() as cursor:
            cursor.execute(sql, args)
        result = cursor.fetchall()
        return result
        
    def __del__(self):
        """closes the connection
        """
        self.connection.close()

