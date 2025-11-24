export function createView(root=document.querySelector('.todo-app')) {
  const sidebar = root.querySelector('.sidebar');
  const sidebarNav = sidebar.querySelector('.sidebar-nav');

  const content = root.querySelector('.content');
  
  return {
    // Sidebar Funcs //

    renderCustomLists(customListsArray) {
      for (const list of customListsArray) {
        const listButton = document.createElement('button');
        listButton.classList.add('list');
        listButton.dataset.list = list;

        listButton.textContent = list;

        sidebarNav.appendChild(listButton);
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
  }
}
