export function createController(model, view) {
  let activeList = 'Today';

  let deleteOnClick = false;

  const renderContentArea = (listName) => {
    view.clearContentArea();

    view.renderHeading(listName);

    const todos = model.getTodos(listName);
    Object.keys(todos).forEach((todoObjKey) => { 
      view.renderTodo(todoObjKey, todos[todoObjKey]);
    });

    view.renderCreateTodoButton();
  }

  return {
    init() {
      //// Sidebar ////

      view.renderCustomLists(model.getCustomLists());

      view.onListButtonSelect((listName) => {
        if (deleteOnClick) {
          deleteOnClick = false;
          view.toggleSidebarCursorDeleteScheme();
          const statusCode = model.deleteList(listName);
          if (statusCode === 1) {
            alert('List must be empty before deletion!');
          }
          else {
            alert('List deleted.');
            view.removeListButton(listName);
          }
        }
        else {
          activeList = listName;
          renderContentArea(listName);
        }
      });

      // Editing //

      view.onNewlistButtonSelect(() => {
        view.renderEditableListButton();
      });

      view.onDeletelistButtonSelect(() => {
        deleteOnClick = true;
        view.toggleSidebarCursorDeleteScheme();
      });

      view.onFinishSidebarEditing((clickTarget, editableListButton, newlistButton) => {
        if (editableListButton && clickTarget !== editableListButton && clickTarget !== newlistButton) {
          view.replaceEditableListButtonWithRealListButton(editableListButton);
          model.addList(editableListButton.textContent);
        }
      });


      //// Content ////

      renderContentArea('Today');

      view.onContentAreaSelect((target) => {
        const targetClass = target.classList[0];
        switch (targetClass) {
          case 'create-todo':
            const todoID = model.addTodo(activeList);
            const todoObj = model.getTodo(activeList, todoID);
            view.renderTodo(todoID, todoObj, true);
            break;
          case 'title':
          case 'notes':
            view.putTodoTextElemIntoEditingMode(target);
            break;
          case 'checkbox':
            const todoID_ = target.parentNode.dataset.todoid;
            if (target.checked) model.markTodoAsDone(activeList, todoID_);
            if (!target.checked) model.markTodoAsNotDone(activeList, todoID_);
            break;
        }
      });

      view.onFinishContentEditing((clickTarget, editableTextElem, createTodoButton) => {
        if (editableTextElem && clickTarget !== editableTextElem && clickTarget !== createTodoButton) {
          view.takeTodoTextElemOutOfEditingMode(editableTextElem);
          const todoID = editableTextElem.parentNode.dataset.todoid;
          const newVal = editableTextElem.textContent;
          if (editableTextElem.classList[0] === 'title') {
            model.updateTodoTitle(activeList, todoID, newVal);
          } else if (editableTextElem.classList[0] === 'notes') {
            model.updateTodoNotes(activeList, todoID, newVal);
          }
        }
      });
    },
  };
};
