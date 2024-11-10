// Initialize Chart.js for the expense summary


const ctx = document.getElementById('expenseChart').getContext('2d');
let expenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Other'],
        datasets: [{
            label: 'Expense Amount',
            data: [0, 0, 0, 0, 0], // Placeholder data, will be updated dynamically
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Function to update the chart with new data
function updateChart(data) {
    expenseChart.data.datasets[0].data = data;
    expenseChart.update();
}

// Handle form submission for adding expenses
document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    
    // Gather form data
    const formData = new FormData(this);
    const expenseData = {
        description: formData.get('description'),
        amount: parseFloat(formData.get('amount')),
        category: formData.get('category')
    };

    // Send data to the backend via AJAX
    fetch('/add', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // Show success message
            
            // Update the chart with the new data
            if (expenseData.category === 'Groceries') expenseChart.data.datasets[0].data[0] += expenseData.amount;
            if (expenseData.category === 'Rent') expenseChart.data.datasets[0].data[1] += expenseData.amount;
            if (expenseData.category === 'Utilities') expenseChart.data.datasets[0].data[2] += expenseData.amount;
            if (expenseData.category === 'Entertainment') expenseChart.data.datasets[0].data[3] += expenseData.amount;
            if (expenseData.category === 'Other') expenseChart.data.datasets[0].data[4] += expenseData.amount;
            
            updateChart(expenseChart.data.datasets[0].data); // Refresh the chart
        } else {
            alert("Failed to add expense. Please try again.");
        }
    })
    .catch(error => console.error('Error:', error));
});
