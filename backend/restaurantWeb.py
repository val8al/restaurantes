#Archivo servidor restaurantWeb.py
from flask import Flask, request, jsonify


app = Flask(__name__)

from joblib import load
import numpy as np

@app.route('/restaurant/<int:orderId>', methods=['POST'])
def recommendation(orderId):
  
  #Process input

  content = request.json
  print(content)


 
  data = np.array([content['service'], content['day'], content['hour'], content['server'], content['allergy']])
  #Load model
  model = load('dt1.joblib')
  print(model.predict(data.reshape(1,-1)))
  result = model.predict(data.reshape(1,-1))
  #Return result0
  return jsonify({"orderId":orderId, "recommendation":result[0]})

