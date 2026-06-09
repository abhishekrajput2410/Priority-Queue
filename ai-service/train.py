import argparse
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
import joblib

CATEGORY_MAP = {'ingest': 1, 'compute': 2, 'report': 3, 'audit': 4, 'notification': 5}

FEATURES = [
    ('type', ['ingest', 'compute', 'report', 'audit', 'notification']),
    ('payloadSize', range(100, 5000, 100)),
    ('waitTime', range(0, 1200, 30)),
    ('queueSize', range(0, 200, 5)),
    ('sla', ['2025-01-01T00:00:00Z', '2025-06-01T00:00:00Z', '2026-01-01T00:00:00Z']),
]

def generate_data(records=2000):
    rows = []
    types = ['ingest', 'compute', 'report', 'audit', 'notification']
    for _ in range(records):
        t = np.random.choice(types)
        payload = np.random.randint(100, 5000)
        wait = np.random.randint(0, 1200)
        queue = np.random.randint(0, 200)
        sla = '2025-01-01T00:00:00Z' if np.random.rand() < 0.5 else '2026-01-01T00:00:00Z'
        score = int(np.clip(np.round(5 - 0.8 * wait / 300 - 0.5 * queue / 50 + np.random.randn() * 0.3), 1, 5))
        rows.append({
            'type': t,
            'payloadSize': payload,
            'waitTime': wait,
            'queueSize': queue,
            'sla': sla,
            'priorityScore': score,
        })
    return pd.DataFrame(rows)


def train_model(test=False):
    data = generate_data(2000)
    features = ['type', 'sla']
    encoder = OneHotEncoder(sparse_output=False, drop='first')
    encoded = encoder.fit_transform(data[features])
    x = np.concatenate([encoded, data[['payloadSize', 'waitTime', 'queueSize']].to_numpy()], axis=1)
    y = data['priorityScore'].to_numpy()
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(x_train, y_train)
    score = model.score(x_test, y_test)
    joblib.dump({'model': model, 'encoder': encoder}, 'priority_model.pkl')
    print(f'Model trained. R2 score: {score:.3f}')
    return score

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train AI priority predictor model')
    parser.add_argument('--test', action='store_true', help='Run a validation test after training')
    args = parser.parse_args()
    score = train_model(test=args.test)
    if args.test:
        print('Test run complete. AI model stored as priority_model.pkl')
