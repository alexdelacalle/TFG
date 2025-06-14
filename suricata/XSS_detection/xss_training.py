import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
import joblib
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv('data.csv')

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'&[a-z]+;', '', text)  
    text = re.sub(r'&#[0-9]+;', '', text) 
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

test_score = model.score(X_test, y_test)
print(f"Test set accuracy: {test_score}")

y_pred = model.predict(X_test)

print("\nMétricas de clasificación:")
print(classification_report(y_test, y_pred))

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=["Seguro", "Malicioso"], yticklabels=["Seguro", "Malicioso"])
plt.xlabel('Predicción')
plt.ylabel('Etiqueta Real')
plt.title('Matriz de Confusión')
plt.show()

precision = cm[1, 1] / (cm[1, 1] + cm[0, 1])
recall = cm[1, 1] / (cm[1, 1] + cm[1, 0])
f1_score = 2 * (precision * recall) / (precision + recall)

print(f"\nPrecisión: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1-score: {f1_score:.2f}")

joblib.dump(model, 'xss_detection_model.pkl')
