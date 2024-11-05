let categories = [
  "Groceries", "Eating Out", "Housing", "Utilities", "Transportation", 
  "Entertainment", "Health & Fitness", "Personal Care", "Debt Payments", 
  "Saving and Investments", "Other"
]; // 11 categories

let balances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Initial balances for each category
let amountInput, categorySelect, updateButton;

function setup() {
  createCanvas(900, 500); // Increase canvas width to give more space for bars and labels
  
  // Create a drop-down to select categories
  createP('Select category:');
  categorySelect = createSelect();
  for (let i = 0; i < categories.length; i++) {
    categorySelect.option(categories[i]); // Add each category to the dropdown
  }
  
  // Create input for new transaction amount
  createP('Enter transaction amount:');
  amountInput = createInput(); // Input field for transaction amount
  
  // Create a button to update the balance
  updateButton = createButton('Update Balance');
  updateButton.mousePressed(updateBalance); // Call updateBalance function when clicked
  
  drawChart(); // Draw the initial chart
}

function updateBalance() {
  // Get the selected category and the entered amount
  let selectedCategory = categorySelect.value();
  let amount = Number(amountInput.value());
  
  // Find the index of the selected category
  let index = categories.indexOf(selectedCategory);
  
  // Update the balance of the selected category
  balances[index] += amount;
  
  // Clear the canvas and redraw the chart with the updated balances
  background(255);
  drawChart();
}

function drawChart() {
  let barWidth = width / categories.length - 10; // Adjust bar width for better spacing

  // Draw bars for each category based on the balance
  for (let i = 0; i < categories.length; i++) {
    let barHeight = map(balances[i], 0, max(balances), 0, height - 150); // Scale bar height based on balance
    
    // Draw bar
    fill(100, 150, 255);
    rect(i * barWidth + 50, height - barHeight - 50, barWidth - 20, barHeight);
    
    // Draw category label with rotation to avoid overlapping
    push();
    fill(0);
    textSize(10);
    textAlign(LEFT, CENTER);
    translate(i * barWidth + barWidth / 2 + 40, height - 25); // Move text position
    rotate(radians(-45)); // Rotate text to prevent overlap
    text(categories[i], 0, 0);
    pop();
    
    // Draw balance value on top of each bar
    fill(0);
    textAlign(CENTER, BOTTOM);
    text(balances[i], i * barWidth + barWidth / 2 + 40, height - barHeight - 55);
  }
}
