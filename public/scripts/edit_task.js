// Edit task button => showing editTextArea and save button
const editTask = (element, id) => {
  const $taskBody = $(element).parents()[1];
  const $originalDesc = $($taskBody).children()[0];
  const originalDesc = $($($taskBody).children()[0]).text();
  $($originalDesc).remove();

  const $editTextarea = $(`<textarea class="editTextarea"></textarea>`);
  $($taskBody).prepend($editTextarea);
  // finding editTextarea from the edit button(parent, children)
  $editButtons = $(element).parent();
  const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${id}, '${originalDesc}')">`).html('<i class="far fa-save"></i>'); // Save button
  const $textarea = $($(element).parents()[1]).children()[0];
  // remove edit button
  $(element).remove();
  // add save button
  $($editButtons).append($saveButton);

  // textarea focus when edit button is clicked
  $($textarea).focus().val(originalDesc);
}

// Edit Title button => showing edit title textarea and save button
const editTitle = (element, id) => {
  // remove task title and edit button
  $taskHeader = $(element).parents()[1];
  const originalTitle = $($($taskHeader).children()[0]).text();
  $($taskHeader).children()[0].remove();
  $(element).remove();

  $saveTitle = $(`<button class="saveTitle"><i class="far fa-save"></i></button>`)
  $($taskHeader).prepend($saveTitle);
  $newTitle = (`<textarea class="editTaskTitle"></textarea>`)
  $($taskHeader).prepend($newTitle);

  const $textarea = $($taskHeader).children()[0];
  // focus on the textarea if the edit button is clicked
  $($textarea).focus().val(originalTitle);

  // in textarea: enter => no line break
  $($textarea).keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
  });

  // when the save button is clicked
  $($($taskHeader).children()[1]).on('click', () => {
    const edittedTitle = $($textarea).val();

    if (edittedTitle) {
      $.ajax({
        url: `/tasks/update/${id}`,
        type: 'POST',
        data: { task_title: edittedTitle}
      }).then(() => {
        console.log('Successfully update task title');
        loadTasks();
      }).catch((err) => {
        console.log(err);
      })
    } else {
      $.ajax({
        url: `/tasks/update/${id}`,
        type: 'POST',
        data: { task_title: originalTitle}
      }).then(() => {
        console.log('Successfully update task title');
        loadTasks();
      }).catch((err) => {
        console.log(err);
      })
    }

  });

}

// Save button => update database
const saveTask = (element, id, originalDesc) => {
  const $textarea = $($(element).parents()[1]).children()[0];
  const edittedText = $($textarea).val();

  if (edittedText) {
    $.ajax({
      url: `/tasks/update/${id}`,
      type: 'POST',
      data: { task_description: edittedText }
    }).then(() => {
      console.log('Successfully update task description');
      loadTasks();
    }).catch((err) => {
      console.log(err);
    })
  } else {
    $.ajax({
      url: `/tasks/update/${id}`,
      type: 'POST',
      data: { task_description: originalDesc }
    }).then(() => {
      console.log('Successfully update task description');
      loadTasks();
    }).catch((err) => {
      console.log(err);
    })
  }
}
