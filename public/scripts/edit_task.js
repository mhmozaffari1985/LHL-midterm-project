// Edit task button => showing editTextArea and save button
const editTask = (element, id) => {
  const $taskBody = $(element).parents()[1];
  const $taskHeader = $($(element).parents()[2]).children()[0];

  const $originalDesc = $($taskBody).children()[0];
  const $originalTitle = $($taskHeader).children()[0];

  const originalDesc = $($originalDesc).text();
  const originalTitle = $($originalTitle).text();

  $($originalDesc).remove();
  $($originalTitle).remove();

  const $editTextarea = $(`<textarea class="editTextarea"></textarea>`);
  const $editTitle = (`<textarea class="editTaskTitle"></textarea>`)

  $($taskBody).prepend($editTextarea);
  $($taskHeader).prepend($editTitle);

  // finding editTextarea from the edit button(parent, children)
  $editButtons = $(element).parent();
  const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${id}, '${originalDesc}', '${originalTitle}')">`).html('<i class="far fa-save"></i>'); // Save button
  const $textareaDesc = $($taskBody).children()[0];
  const $textareaTitle = $($taskHeader).children()[0];

  // remove edit button
  $(element).remove();
  // add save button
  $($editButtons).append($saveButton);

  // textarea focus when edit button is clicked
  $($textareaDesc).focus().val(originalDesc);
  $($textareaTitle).focus().val(originalTitle);
}

// // Edit Title button => showing edit title textarea and save button
// const editTitle = (element, id) => {
//   // remove task title and edit button
//   $taskHeader = $(element).parents()[1];
//   const originalTitle = $($($taskHeader).children()[0]).text();
//   $($taskHeader).children()[0].remove();
//   $(element).remove();

//   $saveTitle = $(`<button class="saveTitle"><i class="far fa-save"></i></button>`)
//   $($taskHeader).prepend($saveTitle);
//   $newTitle = (`<textarea class="editTaskTitle"></textarea>`)
//   $($taskHeader).prepend($newTitle);

//   const $textarea = $($taskHeader).children()[0];
//   // focus on the textarea if the edit button is clicked
//   $($textarea).focus().val(originalTitle);

//   // in textarea: enter => no line break
//   $($textarea).keypress(function(event) {
//     if (event.keyCode == 13) {
//         event.preventDefault();
//     }
//   });

//   // when the save button is clicked
//   $($($taskHeader).children()[1]).on('click', () => {
//     const edittedTitle = $($textarea).val();

//     if (edittedTitle) {
//       $.ajax({
//         url: `/tasks/update/${id}`,
//         type: 'POST',
//         data: { task_title: edittedTitle}
//       }).then(() => {
//         console.log('Successfully update task title');
//         loadTasks();
//       }).catch((err) => {
//         console.log(err);
//       })
//     } else {
//       $.ajax({
//         url: `/tasks/update/${id}`,
//         type: 'POST',
//         data: { task_title: originalTitle}
//       }).then(() => {
//         console.log('Successfully update task title');
//         loadTasks();
//       }).catch((err) => {
//         console.log(err);
//       })
//     }

//   });
// }

// Save button => update database
const saveTask = (element, id, originalDesc, originalTitle) => {
  const $textareaDesc = $($(element).parents()[1]).children()[0];
  const $textareaTitle = $($($(element).parents()[2]).children()[0]).children()[0];
  const edittedDesc = $($textareaDesc).val();
  const edittedTitle = $($textareaTitle).val();

  if (edittedDesc) {
    $.ajax({
      url: `/tasks/update/${id}`,
      type: 'POST',
      data: { task_description: edittedDesc }
    }).then(() => {
      if (edittedTitle) {
        $.ajax({
          url: `/tasks/update/${id}`,
          type: 'POST',
          data: { task_title: edittedTitle }
        }).then(() => {
          loadTasks();
        }).catch((err) => {
          console.log(err);
        })
      } else {
        $.ajax({
          url: `/tasks/update/${id}`,
          type: 'POST',
          data: { task_title: originalTitle }
        }).then(() => {
          loadTasks();
        }).catch((err) => {
          console.log(err);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  } else {
    $.ajax({
      url: `/tasks/update/${id}`,
      type: 'POST',
      data: { task_description: originalDesc }
    }).then(() => {
      if (edittedTitle) {
        $.ajax({
          url: `/tasks/update/${id}`,
          type: 'POST',
          data: { task_title: edittedTitle }
        }).then(() => {
          loadTasks();
        }).catch((err) => {
          console.log(err);
        })
      } else {
        $.ajax({
          url: `/tasks/update/${id}`,
          type: 'POST',
          data: { task_title: originalTitle }
        }).then(() => {
          loadTasks();
        }).catch((err) => {
          console.log(err);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}


// // Created function to delete the task category
const deleteCategoryFromTask = (taskId, categroyId) => {   
  
  if (confirm("Do you really want to delete?")){
    // if user clicked yes
    $.ajax({
      url: `/tasks/categories/delete/${taskId}/${categroyId}`,
      type: 'POST'
    }).then(() => {
      console.log('Successfully delete the category from item!')
      loadTasks();
    }).catch((err) => {
      console.log(err);
    })
  }
};

const showCategories = (taskId) => {  
  $(`#addCategory${taskId}`).hide();
  $(`#filmsCategory${taskId}`).show();
  $(`#seriesCategory${taskId}`).show();
  $(`#restaurantCategory${taskId}`).show();
  $(`#booksCategory${taskId}`).show();
  $(`#shoppingCategory${taskId}`).show();
};
// // Created function to delete the task category
const addCategoryToTask = (taskId, categroyId) => {  
    $.ajax({
      url: `/tasks/categories/add/${taskId}/${categroyId}`,
      type: 'POST'
    }).then(() => {
      console.log('Successfully add the category to this item!')
      loadTasks();
    }).catch((err) => {
      console.log(err);
    })  
};