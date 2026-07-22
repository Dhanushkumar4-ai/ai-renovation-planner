"""
Renov-AI Flask ML Microservice
Exposes recommendation endpoint to Express backend
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from recommend import recommend_workers
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'renovai-ml'})

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'JSON body required'}), 400

        requirement = data.get('requirement', '')
        workers = data.get('workers', [])

        if not requirement:
            return jsonify({'error': 'requirement is required'}), 400

        logger.info(f'Recommendation request: "{requirement[:60]}..." with {len(workers)} workers')

        results = recommend_workers(requirement, workers)

        logger.info(f'Returning {len(results)} ranked workers')
        return jsonify({'recommendations': results, 'total': len(results)})

    except Exception as e:
        logger.error(f'Recommendation error: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/design-suggest', methods=['POST'])
def design_suggest():
    """Rule-based interior design suggestions."""
    try:
        data = request.get_json()
        prompt = data.get('prompt', '').lower()

        suggestions = {
            'color_palette': [],
            'flooring': '',
            'cabinets': '',
            'lighting': '',
            'furniture': '',
            'concepts': ''
        }

        if 'kitchen' in prompt:
            suggestions = {
                'color_palette': ['Crisp White #FFFFFF', 'Warm Beige #F5F0EB', 'Navy Blue #1E3A5F'],
                'flooring': 'Italian marble or anti-slip vitrified tiles (60×60cm)',
                'cabinets': 'Shaker-style white laminate with soft-close hinges, quartz countertops',
                'lighting': 'Under-cabinet LED strips + pendant island lights',
                'furniture': 'Island with bar stools, integrated appliance panels',
                'concepts': 'U-shaped or L-shaped modular layout with dedicated zones'
            }
        elif 'bathroom' in prompt or 'bath' in prompt:
            suggestions = {
                'color_palette': ['Warm White #FAF9F6', 'Sage Green #7C9A7E', 'Matte Black #1C1C1C'],
                'flooring': 'Mosaic anti-slip porcelain or heated marble tiles',
                'cabinets': 'Floating walnut veneer vanity with integrated basin',
                'lighting': 'Backlit mirror + waterproof LED strips',
                'furniture': 'Freestanding tub, frameless glass shower',
                'concepts': 'Spa-inspired with rainfall shower and concealed storage'
            }
        elif 'bedroom' in prompt or 'bed' in prompt:
            suggestions = {
                'color_palette': ['Warm Ivory #F8F4EE', 'Dusty Rose #C4A4A4', 'Charcoal #36454F'],
                'flooring': 'Warm oak engineered wood or thick pile carpet',
                'cabinets': 'Built-in floor-to-ceiling wardrobe with sliding mirrors',
                'lighting': 'Bedside pendant + cove lighting + reading lamps',
                'furniture': 'Upholstered headboard, bedside tables, dressing table',
                'concepts': 'Cozy retreat with blackout curtains and ambient lighting'
            }
        else:
            suggestions = {
                'color_palette': ['Off White #F9F5EF', 'Terracotta #C4622D', 'Forest Green #2D4A3E'],
                'flooring': 'Wide-plank oak hardwood or large format vitrified tiles',
                'cabinets': 'Built-in shelving with integrated LED backlighting',
                'lighting': 'Statement chandelier + floor lamps + smart dimmers',
                'furniture': 'L-shaped modular sofa, marble coffee table, accent chairs',
                'concepts': 'Open-plan with feature wall and mixed textures'
            }

        return jsonify(suggestions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    print(f'🤖 Renov-AI ML Service starting on port {port}')
    app.run(host='0.0.0.0', port=port, debug=False)

