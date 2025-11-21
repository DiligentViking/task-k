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

        listButton.textContent = list;

        sidebarNav.appendChild(listButton);
      }
    },


    // Content Funcs //

    renderTodo() {

    },
    renderTodolist() {

    },
  }
}