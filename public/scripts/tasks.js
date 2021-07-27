// Test Script To Print User Names

// 1. Function to create a single task element
const createTaskElement = function(data) {
  const $output = $('<article class="tasks">'); // Output is a tasks class article

  // Checkbox
  const $checkbox = $(`<button class="checkbox" onClick="checkTask(this, ${data.id})"></button>`);

  // Task Content Container
  const $taskContent = $('<div class="taskContent">');

  // Task Header Tags
  const $taskHeader = $('<header class="taskHeader">'); // Set task header tag
  const $taskTitle = $('<p class="taskTitle">').text(data.task_title); // Set p tag in task header
  const $editTitle = $(`<div class="editTitle"><button onClick="editTitle(this, ${data.id})"><i class="far fa-edit"></i></button></div>`); // Set edit button for task title
  const $deleteTask = $(`<button class="deleteTask btn btn-danger" onClick="deleteTask(${data.id})">`).text('Delete Task'); // Set delete button tag

  // Append Header Tags
  $taskHeader.append($taskTitle).append($editTitle).append($deleteTask);

  // Task Body Tags
  const $taskBody = $('<div class="taskBody">'); // Set div with task body class
  const $taskDescription = $('<p class="taskDescription">').text(data.task_description); // Set p with taskDescription class
  const $editButtons = $('<div class="editButtons">') // Set div with editButtons class
  const $editButton = $(`<button class="btn btn-outline-secondary" onClick="editTask(this, ${data.id})">`).html('<i class="far fa-edit"></i>Edit'); // Edit button
  // const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${data.id})">`).html('<i class="far fa-save"></i>Save'); // Save button
  const $editTextarea = $('<textarea class="editTextarea"></textarea>');

  // Append Body Tags
  $editButtons.append($editButton);
  $taskBody.append($taskDescription).append($editButtons);

  // Task Footer
  const $taskFooter = $('<footer class="taskFooter">'); // Set footer tag with taskFooter class

  // Only has tags if categories exist (this also handles removal for deletion)
  if(data.category_name) {

    const $categoryContainer = $('<div class="categoryContainer">'); // Set div with class categoryContainer

    // For the real script, there should be a loop here for each category including the append step!
    const $removeCategories = $(`<button class="removeCategories" onClick="deleteCategoryFromTask(${data.id},'${data.category_id}')">`).text('❌');
    $categoryContainer.append($removeCategories);

    const $categories = $('<span class="categories">').text(data.category_name);

    $categoryContainer.append($categories);

    // const $addCategory = $('<button class="addCategory">').text('Add Category To Item'); // Set addCategory button

    // Append Footer tags
    $taskFooter.append($categoryContainer);
  }


  // Append $output
  $taskContent.append($taskHeader).append($taskBody).append($editTextarea).append($taskFooter);
  $output.append($checkbox).append($taskContent);

  return $output;
};



// 2. Function to loop through example data set and render all tasks
const renderTasks = function(data) {
  $('#allTasks').html(''); // Clears default text

  for (const someTask of data) { // loops through tasks
    if (someTask.status_id === 1) {
      $task = createTaskElement(someTask); // calls createTaskElement for each task
      $('#allTasks').prepend($task); // takes return value and prepends (ensures order) it to the tasks container
    }
  }
};

// 3. Create a function to do this directly from the database API
const loadTasks = function() {
  $.getJSON('/api/tasks', function(data) {
    // jQuery shorthand for Ajax
    renderTasks(data.tasks);
  });
};

$(document).ready(function() {
  // 4. Call load function
  loadTasks()
});
