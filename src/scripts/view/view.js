export function createView(root=document.querySelector('.todo-app')) {
  const sidebar = root.querySelector('.sidebar');
  const content = root.querySelector('.content');
  
  return {
    renderTodo() {
      console.log(content);
    },
    renderTodolist() {

    },
  }
}