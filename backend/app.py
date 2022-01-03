import re
from flask import Flask, request, render_template
import api.api as api
app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def server():
    print("machine_id = ",machine_id2)
    if request.method == 'POST':
      if request.json['btn'] == 'allday':
        api.All_Out(machine_id2)
      if request.json['btn'] == 'ex':
        input_gas = request.json['input_gas']
        api.Ex_Out(input_gas, machine_id2)
      if request.json['btn'] == 'switch_sample':
        api.SwitchSample()
      if request.json['btn'] == 'switch_purge':
        api.SwitchPurge()
      if request.json['btn'] == 'ex_done':
        api.add_ex_finish()
    return render_template('front.html')

if __name__ == '__main__':
    api.ChooseComPort()
    machine_id = api.Got_Machine_ID()
    global machine_id2
    machine_id2 = machine_id
    app.run(debug=False, port = input("please Select Port Number :　"))
    # app.run(debug= False)
