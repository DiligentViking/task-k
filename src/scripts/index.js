import { createModel } from './model/model.js';
import { createView } from './view/view.js';
import { createController } from './controller/controller.js';

const model = createModel();
const view = createView();
const controller = createController(model, view);



// model.addList('Today');
// model.addList('QWER');

// const todoID = model.addTodo('QWER', 'Do the campaign', 'Make sure you master the lessons it teaches');

// model.linkTodoToToday('QWER', todoID);
// model.markTodoAsDone('Today', todoID);

// model.unlinkTodoFromToday('QWER', todoID);
