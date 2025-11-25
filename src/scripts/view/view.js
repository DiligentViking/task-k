export function createView(root=document.querySelector('.todo-app')) {
  const sidebar = root.querySelector('.sidebar');
  const sidebarNav = sidebar.querySelector('.sidebar-nav');
  const sidebarTools = sidebar.querySelector('.sidebar-tools');
  const newlistButton = sidebarTools.querySelector('.newlist');
  const editlistButton = sidebarTools.querySelector('.editlist');
  const deletelistButton = sidebarTools.querySelector('.deletelist');

  const content = root.querySelector('.content');

  return {
    // Sidebar Funcs //

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
        controllerFunc(listName);
      });
    },


    // Content Funcs //

    clearContentArea() {
      content.textContent = '';
    },

    renderHeading(listName) {
      const h1 = document.createElement('h1');

      h1.textContent = listName;

      content.appendChild(h1);
    },

    renderTodo(todoObj) {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      const checkbox = document.createElement('input');
      checkbox.classList.add('checkbox');
      checkbox.type = 'checkbox';

      const title = document.createElement('p');
      title.classList.add('.title');
      title.textContent = todoObj.title;

      const notes = document.createElement('p');
      notes.classList.add('.notes');
      notes.textContent = todoObj.notes;

      todoDiv.appendChild(checkbox);
      todoDiv.appendChild(title);
      todoDiv.appendChild(notes);

      content.appendChild(todoDiv);
    },

    
    // Editing Funcs //

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

    onFinishEditing(controllerFunc) {
      window.addEventListener('click', (e) => {
        const editableListButton = document.querySelector('.list.editing');
        controllerFunc(e.target, editableListButton, newlistButton);
      });
      window.addEventListener('keydown', (e) => {
        const editableListButton = document.querySelector('.list.editing');
        if (e.key !== 'Enter') return;
        controllerFunc(null, editableListButton, newlistButton);
      });
    },

    onNewlistButtonSelect(controllerFunc) {
      newlistButton.addEventListener('click', () => {
        controllerFunc();
      });
    },
  };
}
