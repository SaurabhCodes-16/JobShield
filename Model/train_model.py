# train_model.py

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# Load dataset
df = pd.read_csv("fake_job_postings.csv")

# Clean + combine text columns
df['text'] = df[['title', 'company_profile', 'description', 'requirements']].fillna('').agg(' '.join, axis=1)
df = df[['text', 'fraudulent']].dropna()

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['fraudulent'], test_size=0.2, random_state=42)

# Vectorize text
vectorizer = TfidfVectorizer(stop_words='english', max_features=10000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Train model
model = LogisticRegression()
model.fit(X_train_tfidf, y_train)

# Evaluate
y_pred = model.predict(X_test_tfidf)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save model + vectorizer
os.makedirs("model", exist_ok=True)
joblib.dump(model, "model/fraud_model.pkl")
joblib.dump(vectorizer, "model/vectorizer.pkl")

print("✅ Model and vectorizer saved in /model folder.")
