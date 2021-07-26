// Test Script To Print User Names

$(document).ready(function() {

  // Single Task
  const task =  {
    id: 1,
    task_title: "Inception",
    task_description: "Very nice movie to watch",
    deleted: false,
    user_id: 1,
    status_id: 1
  };

  // 1. Function to create a single task element
  const createTaskElement = function(data) {
    const $output = $('<article class="tasks">'); // Output is a tasks class article

    // Checkbox
    const $checkbox = $('<button class="checkbox"></button>');

    // Task Content Container
    const $taskContent = $('<div class="taskContent">');

    // Task Header Tags
    const $taskHeader = $('<header class="taskHeader">'); // Set task header tag
    const $taskTitle = $('<p class="taskTitle">').text(data.task_title); // Set p tag in task header
    const $deleteTask = $('<button class="deleteTask btn btn-danger">').text('Delete Task'); // Set delete button tag

    // Append Header Tags
    $taskHeader.append($taskTitle).append($deleteTask);

    // Task Body Tags
    const $taskBody = $('<div class="taskBody">'); // Set div with task body class
    const $taskDescription = $('<p class="taskDescription">').text(data.task_description); // Set p with taskDescription class
    const $editButtons = $('<div class="editButtons">') // Set div with editButtons class
    const $editButton = $('<button class="btn btn-outline-secondary">').html('<i class="far fa-edit"></i>Edit'); // Edit button
    const $saveButton = $('<button class="btn btn-outline-secondary">').html('<i class="far fa-save"></i>Save'); // Save button

    // Append Body Tags
    $editButtons.append($editButton).append($saveButton);
    $taskBody.append($taskDescription).append($editButtons);

    // Task Footer
    const $taskFooter = $('<footer class="taskFooter">'); // Set footer tag with taskFooter class

    const $categoryContainer = $('<div class="categoryContainer">') // Set div with class categoryContainer

    // For the real script, there should be a loop here for each category including the append step!
    const $categories = $('<span class="categories">').text('Some Category');

    $categoryContainer.append($categories)

    // const $addCategory = $('<button class="addCategory">').text('Add Category To Item'); // Set addCategory button

    // Append Footer tags
    $taskFooter.append($categoryContainer);

    // Append $output
    $taskContent.append($taskHeader).append($taskBody).append($taskFooter);
    $output.append($checkbox).append($taskContent);

    return $output;
  };

  // All tasks
  const tasks = [
    {
    id: 1,
    task_title: "Inception",
    task_description: "Very nice movie to watch",
    deleted: false,
    user_id: 1,
    status_id: 1
    },
    {
    id: 2,
    task_title: "The Butcher Chef",
    task_description: "Yummy",
    deleted: false,
    user_id: 1,
    status_id: 2
    },
    {
    id: 3,
    task_title: "Mistborn",
    task_description: "Good book",
    deleted: false,
    user_id: 2,
    status_id: 2
    },
    {
    id: 4,
    task_title: "Play Station 5",
    task_description: "for having fantastic time",
    deleted: false,
    user_id: 2,
    status_id: 1
    }];

    // 2. Function to loop through example data set and render all tasks
    const renderTasks = function (data) {
      $('#allTasks').html(''); // Clears default text
      for (const someTask of data) { // loops through tasks
        $task = createTaskElement(someTask); // calls createTaskElement for each task
        $('#allTasks').prepend($task); // takes return value and prepends (ensures order) it to the tasks container
      }
    }

    renderTasks(tasks);

    // 3. Create a function to do this directly from the database.
    const loadTasks = function (data) {
      // Load data from database or API
      // Call renderTasks
    }

});
