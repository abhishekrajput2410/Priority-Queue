from flask import Flask, jsonify, request
from priorityPredictor import PriorityPredictor

app = Flask(__name__)
predictor = PriorityPredictor('priority_model.pkl')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'AI Priority Predictor'})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    required_keys = {'type', 'payloadSize', 'waitTime', 'queueSize', 'sla'}
    if not data or not required_keys.issubset(data.keys()):
        return jsonify({'error': 'Invalid payload'}), 400

    prediction = predictor.predict(data)
    return jsonify({'predictedPriority': prediction})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
