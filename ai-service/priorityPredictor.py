import joblib
import numpy as np


class PriorityPredictor:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model_bundle = joblib.load(model_path)
        self.model = self.model_bundle['model']
        self.encoder = self.model_bundle['encoder']

    def extract_features(self, payload):
        categories = np.array([[payload['type'], payload['sla']]])
        encoded = self.encoder.transform(categories)
        if hasattr(encoded, 'toarray'):
            encoded = encoded.toarray()
        features = np.concatenate(
            [
                encoded,
                np.array(
                    [[payload['payloadSize'], payload['waitTime'], payload['queueSize']]],
                    dtype=float,
                ),
            ],
            axis=1,
        )
        return features

    def predict(self, payload):
        features = self.extract_features(payload)
        score = self.model.predict(features)[0]
        score = max(1, min(5, round(score)))
        mapping = {1: 'CRITICAL', 2: 'HIGH', 3: 'MEDIUM', 4: 'LOW', 5: 'UNKNOWN'}
        return mapping[int(score)]
