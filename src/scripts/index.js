import { createListModel } from './model/model.js';

const model = createListModel();

model.addList('QWER');

const todoID = model.addTodo('QWER', 'Do the campaign', 'Make sure you master the lessons it teaches');

model.markTodoAsDone('QWER', todoID);
