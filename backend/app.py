from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/generate-recipe', methods=['POST'])
def generate_recipe():
    requirements = request.json.get('requirements', '')
    # Basic keyword-based logic for demo purposes
    if 'customer' in requirements.lower():
        model = 'GPT-3.5 or GPT-4 (for conversational AI)'
        required_data = ['Customer service FAQs', 'Chat logs', 'Product info']
        formats = {'faqs': 'CSV/JSON', 'chat_logs': 'Text/CSV', 'product_info': 'JSON'}
        flow = ['Greet user', 'Ask for issue', 'Provide solution', 'Escalate if needed']
    elif 'medical' in requirements.lower():
        model = 'GPT-4 (with medical fine-tuning)'
        required_data = ['Medical terminology', 'Symptom-condition mappings', 'Protocols']
        formats = {'terminology': 'CSV', 'symptoms': 'JSON', 'protocols': 'JSON'}
        flow = ['Greet patient', 'Ask symptoms', 'Suggest next steps', 'Provide disclaimer']
    else:
        model = 'GPT-3.5 or custom model'
        required_data = ['Relevant domain data', 'Sample conversations']
        formats = {'domain_data': 'CSV/JSON', 'samples': 'Text'}
        flow = ['Greet user', 'Collect info', 'Respond', 'End conversation']
    recipe = {
        'purpose': requirements,
        'suggested_model': model,
        'required_data': required_data,
        'formats': formats,
        'conversation_flow': flow,
        'integration_notes': 'Connect to relevant APIs or databases as needed.',
        'next_steps': 'Upload the required data and review the conversation flow.'
    }
    return jsonify(recipe)

if __name__ == '__main__':
    app.run(debug=True)