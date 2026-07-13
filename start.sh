#!/bin/bash
# Renov-AI Startup Script
# Starts MongoDB, Express backend, Flask ML service, and React frontend

set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🏠 Starting Renov-AI..."
echo ""

# 1. Ensure MongoDB is running
echo "🗄️  Starting MongoDB..."
brew services start mongodb-community 2>/dev/null || echo "  MongoDB already running or using system service"
sleep 2

# 2. Start Express Backend
echo "⚡ Starting Express backend (port 3001)..."
cd "$ROOT/server"
node index.js &
BACKEND_PID=$!
sleep 3

# 3. Start Flask ML Service
echo "🤖 Starting Flask ML service (port 5001)..."
cd "$ROOT/ml-service"
python3 app.py &
ML_PID=$!
sleep 3

# 4. Start React Frontend
echo "🎨 Starting React frontend (port 5173)..."
cd "$ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ All services started!"
echo "   Frontend:   http://localhost:5173"
echo "   Backend:    http://localhost:3001"
echo "   ML Service: http://localhost:5001"
echo ""
echo "📧 Admin login: admin@renovai.com / password123"
echo "📧 User login:  arjun.sharma@gmail.com / password123"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for any process to exit
wait $FRONTEND_PID
