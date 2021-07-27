// Edit button => showing editTextArea
const editTask = (element, id) => {
  // finding editTextarea from the edit button(parent, children)
  $($($(element).parents()[2]).children()[2]).fadeIn();
  const $saveButton = $(`<button class="btn btn-outline-secondary" onClick="saveTask(this, ${id})">`).html('<i class="far fa-save"></i>Save'); // Save button
  if ($($(element).parent()).children().length === 1) {
    $($(element).parent()).append($saveButton);
  }
}

const saveTask = (element, id) => {
  const $textarea = $($($(element).parents()[2]).children()[2]);
  const edittedText = $textarea.val();

  $.ajax({
    url: `/tasks/update/${id}`,
    type: 'POST',
    data: { task_description: edittedText }
  }).then(() => {
    console.log('Successfully update task');
    $textarea.fadeToggle();
    loadTasks();
  }).catch((err) => {
    console.log(err);
  })
}