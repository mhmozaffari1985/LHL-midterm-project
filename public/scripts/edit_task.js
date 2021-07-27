// Edit task button => showing editTextArea and save button
const editTask = (element, id) => {
  // finding editTextarea from the edit button(parent, children)
  $($($(element).parents()[2]).children()[2]).fadeIn();
  const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${id})">`).html('<i class="far fa-save"></i>Save'); // Save button
  if ($($(element).parent()).children().length === 1) {
    $($(element).parent()).append($saveButton);
  }
}

// Edit Title button => showing edit title textarea and save button
const editTitle = (element, id) => {
  // remove task title and edit button
  $taskHeader = $(element).parents()[1];
  $($taskHeader).children()[0].remove();
  $(element).remove();

  $saveTitle = $(`<button class="saveTitle"><i class="far fa-save"></i></button>`)
  $($taskHeader).prepend($saveTitle);
  $newTitle = (`<textarea class="editTaskTitle"></textarea>`)
  $($taskHeader).prepend($newTitle);

  const $textarea = $($taskHeader).children()[0];
  // focus on the textarea if the edit button is clicked
  $($textarea).focus();

  // in textarea: enter => no line break
  $($textarea).keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
  });

  // when the save button is clicked
  $($($taskHeader).children()[1]).on('click', () => {
    const edittedTitle = $($textarea).val();

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
  });

}

// Save button => update database
const saveTask = (element, id) => {
  const $textarea = $($($(element).parents()[2]).children()[2]);
  const edittedText = $textarea.val();

  $.ajax({
    url: `/tasks/update/${id}`,
    type: 'POST',
    data: { task_description: edittedText }
  }).then(() => {
    console.log('Successfully update task description');
    $textarea.fadeToggle();
    loadTasks();
  }).catch((err) => {
    console.log(err);
  })
}