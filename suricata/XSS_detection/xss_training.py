import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
import joblib

df = pd.read_csv('/root/XSS_dataset.csv')

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'&[a-z]+;', '', text)  # eliminar entidades HTML
    text = re.sub(r'&#[0-9]+;', '', text)  # eliminar entidades numéricas
    return text  


df['Sentence'] = df['Sentence'].apply(preprocess_text)

X = df['Sentence']
y = df['Label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = make_pipeline(
    TfidfVectorizer(max_features=5000, ngram_range=(3, 5), analyzer='char'),
    RandomForestClassifier(n_estimators=100, random_state=42)
)

cv_scores = cross_val_score(model, X_train, y_train, cv=5)  
print(f"Cross-validation scores: {cv_scores}")
print(f"Average CV score: {np.mean(cv_scores)}")

model.fit(X_train, y_train)

joblib.dump(model, '/root/xss_detection_model.pkl')
