from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/generate-recipe', methods=['POST'])
def generate_recipe():
    chatbot_type = request.json.get('type')
    
    # Recipe templates based on chatbot type
    recipes = {
        'customer_service': {
            'required_data': [
                'Customer service FAQs',
                'Previous chat logs',
                'Product information',
                'Common issues database'
            ],
            'formats': {
                'faqs': 'CSV or JSON with Q&A pairs',
                'chat_logs': 'Text files with timestamped conversations',
                'product_info': 'JSON with product details',
                'issues': 'CSV with issue-solution pairs'
            },
            'preprocessing': [
                'Remove personal information',
                'Categorize by issue type',
                'Extract common patterns',
                'Tag with resolution times'
            ]
        },
        'medical_assistant': {
            'required_data': [
                'Medical terminology database',
                'Symptom-condition mappings',
                'Treatment protocols',
                'Patient interaction templates'
            ],
            'formats': {
                'terminology': 'CSV with terms and definitions',
                'symptoms': 'JSON with symptom-condition relationships',
                'protocols': 'JSON with structured treatment steps',
                'templates': 'Text files with conversation templates'
            },
            'preprocessing': [
                'Validate medical terms',
                'Structure symptom hierarchies',
                'Tag urgency levels',
                'Anonymize sample data'
            ]
        }
    }
    
    return jsonify(recipes.get(chatbot_type, {
        'error': 'Please provide a valid chatbot type'
    }))

if __name__ == '__main__':
    app.run(debug=True)