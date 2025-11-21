import { createModel } from './model/model.js';

const model = createModel();

model.addList('Today');
model.addList('QWER');

const todoID = model.addTodo('QWER', 'Do the campaign', 'Make sure you master the lessons it teaches');

model.linkTodoToToday('QWER', todoID);
model.markTodoAsDone('Today', todoID);

model.unlinkTodoFromToday('QWER', todoID);
