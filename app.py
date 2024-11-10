from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Route for the dashboard page (index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Route for the expense history page (history.html)
@app.route('/history')
def history():
    # Placeholder data for demonstration
    sample_expenses = [
        {"description": "Grocery shopping", "amount": 50, "date": "2023-10-15", "category": "Groceries"},
        {"description": "Electricity bill", "amount": 100, "date": "2023-10-20", "category": "Utilities"},
    ]
    return render_template('history.html', records=sample_expenses)

# Route to handle adding a new expense
@app.route('/add', methods=['POST'])
def add_expense():
    # Get data from form submission
    description = request.form.get('description')
    amount = request.form.get('amount')
    category = request.form.get('category')
    
    # Log the expense data for demonstration (no database storage)
    print(f"Expense added: {description}, ${amount}, Category: {category}")

    # Return a success message as JSON (to be processed by JavaScript)
    return jsonify(success=True, message="Expense added successfully")

if __name__ == '__main__':
    app.run(debug=True)
