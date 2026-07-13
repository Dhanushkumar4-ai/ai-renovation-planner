"""
Renov-AI ML Recommendation Engine
TF-IDF + Cosine Similarity + Random Forest Pipeline
"""
import re
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import MinMaxScaler

# --- Stop words (domain-specific) ---
STOP_WORDS = {
    'i', 'me', 'my', 'we', 'need', 'want', 'would', 'like', 'the', 'a', 'an',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'for', 'in', 'of', 'to', 'with', 'at', 'by', 'from', 'up', 'and', 'or',
    'but', 'not', 'also', 'some', 'please', 'help', 'home', 'house', 'flat',
    'apartment', 'room', 'rooms', 'area', 'space', 'under', 'above', 'budget',
    'good', 'best', 'great', 'nice', 'beautiful', 'looking', 'getting', 'get'
}

def clean_text(text: str) -> str:
    """Clean and normalize text."""
    if not text:
        return ''
    text = text.lower()
    text = re.sub(r'[₹$,\d]+', '', text)  # remove currency and numbers
    text = re.sub(r'[^\w\s]', ' ', text)  # remove punctuation
    tokens = [t for t in text.split() if t not in STOP_WORDS and len(t) > 2]
    return ' '.join(tokens)

def build_worker_text(worker: dict) -> str:
    """Build searchable text from worker profile."""
    parts = []
    if worker.get('skills'):
        parts.extend(worker['skills'])
    if worker.get('category'):
        parts.append(worker['category'])
    if worker.get('bio'):
        parts.append(worker['bio'])
    return clean_text(' '.join(parts))

def recommend_workers(requirement: str, workers: list) -> list:
    """
    Main recommendation pipeline:
    1. Text cleaning
    2. TF-IDF Vectorization
    3. Cosine Similarity
    4. Feature Engineering
    5. Random Forest Ranking
    6. Final Score = 0.6*RF + 0.3*cosine + 0.1*normalized_rating
    """
    if not workers:
        return []

    # Step 1: Clean requirement
    cleaned_req = clean_text(requirement)
    if not cleaned_req:
        cleaned_req = requirement.lower()

    # Step 2: Build worker text corpus
    worker_texts = [build_worker_text(w) for w in workers]

    # Step 3: TF-IDF Vectorization
    corpus = [cleaned_req] + worker_texts
    try:
        tfidf = TfidfVectorizer(ngram_range=(1, 2), min_df=1, max_features=500)
        tfidf_matrix = tfidf.fit_transform(corpus)
        req_vec = tfidf_matrix[0:1]
        worker_vecs = tfidf_matrix[1:]

        # Step 4: Cosine Similarity
        cosine_scores = cosine_similarity(req_vec, worker_vecs).flatten()
    except Exception:
        cosine_scores = np.zeros(len(workers))

    # Step 5: Feature Engineering
    features = []
    for i, w in enumerate(workers):
        rating = float(w.get('rating', 0)) / 5.0
        experience = min(float(w.get('experience', 0)) / 30.0, 1.0)
        projects = min(float(w.get('completedProjects', 0)) / 300.0, 1.0)
        hire_count = min(float(w.get('hireCount', 0)) / 200.0, 1.0)
        availability = 1.0 if w.get('isAvailable', True) else 0.3
        cosine = float(cosine_scores[i]) if i < len(cosine_scores) else 0.0
        features.append([cosine, rating, experience, projects, hire_count, availability])

    features_array = np.array(features)

    # Step 6: Random Forest Ranking
    # Training labels: simulate ideal ranking using weighted sum
    train_labels = (
        0.35 * features_array[:, 0] +   # cosine similarity
        0.30 * features_array[:, 1] +   # rating
        0.20 * features_array[:, 2] +   # experience
        0.10 * features_array[:, 3] +   # projects
        0.05 * features_array[:, 4]     # hire count
    )

    try:
        rf = RandomForestRegressor(n_estimators=50, random_state=42, max_depth=5)
        # Use a small synthetic dataset augmented with our features for training
        n = len(workers)
        if n >= 2:
            rf.fit(features_array, train_labels)
            rf_scores = rf.predict(features_array)
        else:
            rf_scores = train_labels
    except Exception:
        rf_scores = train_labels

    # Step 7: Normalize scores
    scaler = MinMaxScaler()
    if len(rf_scores) > 1:
        rf_norm = scaler.fit_transform(rf_scores.reshape(-1, 1)).flatten()
        cosine_norm = scaler.fit_transform(cosine_scores.reshape(-1, 1)).flatten()
    else:
        rf_norm = rf_scores
        cosine_norm = cosine_scores

    # Step 8: Final Score formula
    ratings_normalized = features_array[:, 1]
    final_scores = 0.6 * rf_norm + 0.3 * cosine_norm + 0.1 * ratings_normalized

    # Step 9: Rank and return top 20
    ranked_indices = np.argsort(final_scores)[::-1][:20]
    results = []
    for idx in ranked_indices:
        w = workers[idx]
        results.append({
            'id': w['id'],
            'name': w.get('name', ''),
            'similarity_score': round(float(cosine_scores[idx]), 4),
            'final_score': round(float(final_scores[idx]), 4),
            'rf_score': round(float(rf_norm[idx]), 4)
        })

    return results
