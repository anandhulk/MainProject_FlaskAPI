from flask import Flask,render_template,jsonify,request
from transformers import pipeline, set_seed
import pandas as pd
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch
from keyphraseExtraction import extractor
from mcqGenrator import generate_option,generate_mcq


pipe = pipeline('summarization', model = "pegasus" )

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
   return render_template("index.html")

@app.route('/summary')
def summary():
    return render_template('summary.html')

@app.route('/mcq')
def mcq():
   return render_template('sample.html')

@app.route('/predict-summary', methods=['POST'])
def process_data():
    input_data = request.get_json()
    res=pipe(input_data['text'])
    output_data = {'message': res[0]['summary_text']}
    return jsonify(output_data)

@app.route('/predict-mcq',methods=['POST'])
def generate():
   input_data = request.get_json()
   response=generate_mcq(input_data['text'])
   output_data= {'keyphrases':response}
   return jsonify(output_data)

@app.route('/predict-summary-mcq',methods=['POST'])
def generateMcq():
   input_data = request.get_json()
   res=pipe(input_data['text'])
   summary_text=res[0]['summary_text']
   response=generate_mcq(summary_text)
   output_data= {'keyphrases':response}
   return jsonify(output_data)

if __name__ == '__main__':
   app.run(debug = True)