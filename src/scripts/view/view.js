export function createView(root=document.querySelector('.todo-app')) {
  const sidebar = root.querySelector('.sidebar');
  const sidebarNav = sidebar.querySelector('.sidebar-nav');
  const newlistButton = sidebar.querySelector('.newlist');

  const content = root.querySelector('.content');

  const dialog = root.querySelector('dialog');

  return {
    // Sidebar Funcs //

    renderListButton(listName) {
      const listButton = document.createElement('button');
      listButton.classList.add('list');
      listButton.dataset.list = listName;

      listButton.textContent = listName;

      sidebarNav.insertBefore(listButton, newlistButton);
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

    
    // Dialog Funcs //

    displayNewListDialog(controllerFunc) {
      const newlistForm = document.createElement('form');
      newlistForm.id = 'newlist';

      const listnameInput = document.createElement('input');
      listnameInput.id = 'listname';
      listnameInput.type = 'text';

      const submitButton = document.createElement('button');
      submitButton.id = 'submit';
      submitButton.textContent = 'Submit';

      newlistForm.appendChild(listnameInput);
      newlistForm.appendChild(submitButton);
      dialog.appendChild(newlistForm);

      dialog.showModal();

      newlistForm.addEventListener('submit', (e) => {
        e.preventDefault();

        dialog.textContent = '';
        dialog.close();

        const listName = listnameInput.value;
        controllerFunc(listName);
      });
    },

    onNewlistButtonSelect(controllerFunc) {
      newlistButton.addEventListener('click', () => {
        this.displayNewListDialog(controllerFunc);  // Watch this (should be view object)
      });
    },
  };
}
