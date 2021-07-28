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
  const $deleteTask = $(`<button class="deleteTask btn btn-danger" onClick="deleteTask(${data.id})">`).text('❌'); // Set delete button tag

  // Append Header Tags
  $taskHeader.append($taskTitle).append($editTitle).append($deleteTask);

  // Task Body Tags
  const $taskBody = $('<div class="taskBody">'); // Set div with task body class
  const $taskDescription = $('<p class="taskDescription">').text(data.task_description); // Set p with taskDescription class
  const $editButtons = $('<div class="editButtons">') // Set div with editButtons class
  const $editButton = $(`<button class="btn btn-outline-secondary" onClick="editTask(this, ${data.id})">`).html('<i class="far fa-edit"></i>Edit'); // Edit button
  // const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${data.id})">`).html('<i class="far fa-save"></i>Save'); // Save button

  // Append Body Tags
  $editButtons.append($editButton)
  $taskBody.append($taskDescription).append($editButtons);

  // Append $output
  $taskContent.append($taskHeader).append($taskBody);
  $output.append($checkbox).append($taskContent);

  return $output;
};

// 2. Function to loop through example data set and render all tasks per category
const renderTasks = function(data) {

  const categories = [];
  // Populate categories
  for (const task of data) {
    if(!categories.includes(task.category_name)){
      categories.push(task.category_name)
    }
  }

  $('#allTasks').html(''); // Clears default text

  // Loops through categories
  for (const category of categories) {
    const $categoryList = $('<section class="categoryList">');
    const $categoryName = $('<h2 class="categoryName">').text(category);

    // Loops through tasks
    for (const someTask of data) {
      if(someTask.status_id === 1 && someTask.category_name === category) {
        $task = createTaskElement(someTask); // calls createTaskElement for each task
        $categoryList.prepend($task); // takes return value and prepends (ensures order) it to the category name
      }
    }

    $categoryList.prepend($categoryName);
    $('#allTasks').append($categoryList);
  }

};

// 3. Create a function to do this directly from the database API
const loadTasks = function() {
  $.getJSON('/api/tasks', function(data) { // jQuery shorthand for Ajax
    renderTasks(data.tasks);
  });
};

// 4. Call load function
$(document).ready(function() {
  loadTasks();
});
