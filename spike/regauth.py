from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort
import os
 
app = Flask(__name__)

def index():
    return "Hello World!"
 
@app.route('/')
def home():
    if not session.get('logged_in'):
        return render_template('login.html')
    else:
        return "Hello Boss! <a href='/logout'>Logout</a>"
 
@app.route('/login', methods=['POST'])
def do_login():
    if request.form['password'] == 'password' and request.form['username'] == 'admin':
        session['logged_in'] = True
    else:
        flash('wrong username or password!')
    return home()
    
@app.route("/logout")
def logout():
    session['logged_in'] = False
    return home()

@app.route('/registration', methods=['POST'])
def do_registration():
    if request.form['username'] != 'admin':
        
        #DB query for create new user
    else:
        flash('Invalid username!')
    return home()
 
if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(host='0.0.0.0', port=4000)
