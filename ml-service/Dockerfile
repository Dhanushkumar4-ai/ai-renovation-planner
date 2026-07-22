# ── Renov-AI Flask ML Microservice ────────────────────────────────────────────
FROM python:3.11-slim

WORKDIR /app

# Install system-level dependencies needed by scikit-learn / numpy
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies (cached layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY . .

# Expose ML service port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5001/health || exit 1

# Use gunicorn for production (multiple workers, stable under load)
CMD gunicorn --bind 0.0.0.0:${PORT:-5001} --workers 2 --timeout 120 app:app
