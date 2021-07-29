// Test Script To Print User Names

// 1. Function to create a single task element
const createTaskElement = function(data) {

  const $output = $('<article class="tasks lined thick">'); // Output is a tasks class article

  // Checkbox
  const $checkbox = $(`<button class="checkbox" onClick="checkTask(this, ${data.id})"></button>`);

  // Task Content Container
  const $taskContent = $('<div class="taskContent">');

  // Task Header Tags
  const $taskHeader = $('<header class="taskHeader">'); // Set task header tag
  const $taskTitle = $('<p class="taskTitle">').text(data.task_title); // Set p tag in task header
  // const $editTitle = $(`<div class="editTitle"><button onClick="editTitle(this, ${data.id})"><i class="far fa-edit"></i></button></div>`); // Set edit button for task title
  const $deleteTask = $(`<button class="deleteTask btn btn-danger" onClick="deleteTask(${data.id})">`).text('❌')
  //.html('<i class="fas fa-trash-alt"></i>'); //TRASH CAN Set delete button tag

  // Append Header Tags
  // $taskHeader.append($taskTitle).append($editTitle).append($deleteTask);
  $taskHeader.append($taskTitle).append($deleteTask);

  // Task Body Tags
  const $taskBody = $('<div class="taskBody">'); // Set div with task body class
  const $taskDescription = $('<p class="taskDescription">').text(data.task_description); // Set p with taskDescription class
  const $editButtons = $('<div class="editButtons">') // Set div with editButtons class
  const $editButton = $(`<button class="btn btn-outline-secondary" onClick="editTask(this, ${data.id})">`).html('<i class="far fa-edit"></i>'); // Edit button
  // const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${data.id})">`).html('<i class="far fa-save"></i>Save'); // Save button

  // Append Body Tags
  $editButtons.append($editButton);
  $taskBody.append($taskDescription).append($editButtons);

  // Task Footer
  const $taskFooter = $('<footer class="taskFooter">'); // Set footer tag with taskFooter class

  // Only has tags if categories exist (this also handles removal for deletion)
  

    const $categoryContainer = $('<div class="categoryContainer">'); // Set div with class categoryContainer
    
    let currentCat = false;
    if(data.category_name) {
      // For the real script, there should be a loop here for each category including the append step!
      const $removeCategories = $(`<button class="removeCategories thin line ${data.category_name}" id="currentCategory" onClick="deleteCategoryFromTask(${data.id},${data.category_id})">`).text(`❌ ${data.category_name}`);
      $categoryContainer.append($removeCategories);
      currentCat = true;
    }
    const $filmsCategory = $(`<button class="addCategoryButton" id="filmsCategory${data.id}" onClick="addCategoryToTask(${data.id},1)">`).text('➕Films');
    const $seriesCategory = $(`<button class="addCategoryButton" id="seriesCategory${data.id}" onClick="addCategoryToTask(${data.id},2)">`).text('➕Series');
    const $restaurantCategory = $(`<button class="addCategoryButton" id="restaurantCategory${data.id}" onClick="addCategoryToTask(${data.id},3)">`).text('➕Resturants');
    const $booksCategory = $(`<button class="addCategoryButton" id="booksCategory${data.id}" onClick="addCategoryToTask(${data.id},4)">`).text('➕Books');
    const $shoppingCategory = $(`<button class="addCategoryButton" id="shoppingCategory${data.id}" onClick="addCategoryToTask(${data.id},5)">`).text('➕Shopping');
    $categoryContainer.append($filmsCategory).append($seriesCategory).append($restaurantCategory).append($booksCategory).append($shoppingCategory);
    
    let $addCategory = $(`<button id="addCategory${data.id}" onClick="showCategories(${data.id})">`).text('➕'); // Set addCategory button
    if(currentCat) {
      $addCategory = $(`<button id="addCategory${data.id}" onClick="showCategories(${data.id})" style="display:none;">`).text('➕'); // Set addCategory button
    }
    // Append Footer tags
    $taskFooter.append($categoryContainer).append($addCategory);

  // Append $output
  $taskContent.append($taskHeader).append($taskBody).append($taskFooter);
  $output.append($checkbox).append($taskContent);

  return $output;
};

// 2. Function to loop through example data set and render all tasks
const renderTasks = function(data) {
  $('#allTasks').html(''); // Clears default text

  // Code for custom number of columns
  const columns = 3; // Change this number to adjust number of columns.
  const rows = Math.ceil(data.length/columns);
  let counter = 0; // Needed to access JSON data.

  for (let i = 0; i < rows; i++) {
    let $row = $('<div class="row">');
    for (let j = 0; j < columns; j++) {
      let $column = $('<div class="column">');
      if (data[counter] && data[counter].status_id === 1) {
        $task = createTaskElement(data[counter]); // calls createTaskElement for each task
        $column.prepend($task); // takes return value and prepends (ensures order) it to the tasks container
      }
      $row.append($column);
      $('#allTasks').append($row);
      counter ++;
    }
  }

  // Code for 1 column!
  // for (const someTask of data) { // loops through tasks
  //   if (someTask.status_id === 1) {
  //     $task = createTaskElement(someTask); // calls createTaskElement for each task
  //     $('#allTasks').prepend($task); // takes return value and prepends (ensures order) it to the tasks container
  //   }
  // }
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
