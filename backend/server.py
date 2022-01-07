import re
import os
from flask import Flask, request, render_template

template_dir = os.path.abspath('../frontend/dist/frontend/')
app = Flask(__name__, template_folder=template_dir, static_folder=template_dir, static_url_path='')
print(template_dir)

@app.route("/ajax", methods=['GET','POST'])
def ajax():
  if request.method == 'POST':
    print("in post")
  return "test"

@app.route("/frontend", methods=['GET','POST'])
def server():
  if request.method == 'POST':
    print("in post")
    if request.json['btn'] == 'allday':
      print("in ajax")
  return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=False, port = 5008)
    # app.run(debug= False)
