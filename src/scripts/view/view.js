export function createView(root=document.querySelector('.todo-app')) {
  const sidebar = root.querySelector('.sidebar');
  const sidebarNav = sidebar.querySelector('.sidebar-nav');
  const sidebarTools = sidebar.querySelector('.sidebar-tools');
  const newlistButton = sidebarTools.querySelector('.newlist');
  const deletelistButton = sidebarTools.querySelector('.deletelist');

  const content = root.querySelector('.content');

  return {
    //// Sidebar Funcs ////

    renderListButton(listName) {
      const listButton = document.createElement('button');
      listButton.classList.add('list');
      listButton.dataset.list = listName;

      listButton.textContent = listName;

      sidebarNav.insertBefore(listButton, sidebarTools);
    },

    renderCustomLists(customListsArray) {
      for (const list of customListsArray) {
        this.renderListButton(list);
      }
    },

    onListButtonSelect(controllerFunc) {
      sidebar.addEventListener('click', (e) => {
        const listName = e.target.dataset.list;
        if (listName) {
          controllerFunc(listName);
        }
      });
    },

    // Editing //

    renderEditableListButton() {
      const listDiv = document.createElement('div');
      listDiv.classList.add('list', 'editing');

      sidebarNav.insertBefore(listDiv, sidebarTools);

      listDiv.contentEditable = 'true';
      listDiv.focus();
    },

    replaceEditableListButtonWithRealListButton(editableListButton) {
      const listName = editableListButton.textContent;

      const listButton = document.createElement('button');
      listButton.classList.add('list');
      listButton.dataset.list = listName;

      listButton.textContent = listName;

      sidebarNav.replaceChild(listButton, editableListButton);
    },

    removeListButton(listName) {
      sidebarNav.querySelector(`[data-list="${listName}"]`).remove();
    },

    toggleSidebarCursorDeleteScheme() {
      sidebar.classList.toggle('cursor-delete');
      sidebarNav.querySelectorAll('*').forEach((node) => {
        node.classList.toggle('cursor-delete');
      });
    },


    onNewlistButtonSelect(controllerFunc) {
      newlistButton.addEventListener('click', () => {
        controllerFunc();
      });
    },

    onDeletelistButtonSelect(controllerFunc) {
      deletelistButton.addEventListener('click', () => {
        controllerFunc();
      });
    },

    onFinishSidebarEditing(controllerFunc) {
      window.addEventListener('click', (e) => {
        const editableListButton = sidebar.querySelector('.list.editing');
        controllerFunc(e.target, editableListButton, newlistButton);
      });
      window.addEventListener('keydown', (e) => {
        const editableListButton = sidebar.querySelector('.list.editing');
        if (e.key !== 'Enter') return;
        controllerFunc(null, editableListButton, newlistButton);
      });
    },


    //// Content Funcs ////

    clearContentArea() {
      content.textContent = '';
    },

    renderHeading(listName) {
      const h1 = document.createElement('h1');

      h1.textContent = listName;

      content.appendChild(h1);
    },

    renderTodo(todoID, todoObj, newTodo=false) {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      todoDiv.dataset.todoid = todoID;

      const checkbox = document.createElement('input');
      checkbox.classList.add('checkbox');
      checkbox.type = 'checkbox';

      const title = document.createElement('p');
      title.classList.add('title');
      title.textContent = todoObj.title;

      const notes = document.createElement('p');
      notes.classList.add('notes');
      notes.textContent = todoObj.notes;

      todoDiv.appendChild(checkbox);
      todoDiv.appendChild(title);
      todoDiv.appendChild(notes);

      content.appendChild(todoDiv);

      if (newTodo) this.putTodoTextElemIntoEditingMode(title);
    },

    renderCreateTodoButton() {
      const createTodoButton = document.createElement('button');
      createTodoButton.classList.add('create-todo');

      createTodoButton.textContent = 'Create Todo';

      content.appendChild(createTodoButton);
    },


    putTodoTextElemIntoEditingMode(target) {
      target.classList.add('editing');
      target.contentEditable = 'true';
      target.focus();
    },

    takeTodoTextElemOutOfEditingMode(editableTextElem) {
      editableTextElem.classList.remove('editing');
      editableTextElem.contentEditable = 'false';
    },

    onContentAreaSelect(controllerFunc) {
      content.addEventListener('click', (e) => {
        controllerFunc(e.target);
      });
    },

    onFinishContentEditing(controllerFunc) {  // a bit redundant, but SRP
      window.addEventListener('click', (e) => {
        const editableTextElem = content.querySelector('.editing');
        const createTodoButton = content.querySelector('.create-todo');
        controllerFunc(e.target, editableTextElem, createTodoButton);
      });
      window.addEventListener('keydown', (e) => {
        const editableTextElem = content.querySelector('.editing');
        const createTodoButton = content.querySelector('.create-todo');
        if (e.key !== 'Enter') return;
        e.preventDefault();
        controllerFunc(null, editableTextElem, createTodoButton);
      });
    },
  };
}
