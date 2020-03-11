
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateTodoInput {
    title: string;
}

export interface IMutation {
    createTodo(input: CreateTodoInput): Todo | Promise<Todo>;
    deleteTodo(id: string): boolean | Promise<boolean>;
}

export interface IQuery {
    getTodoList(): Todo[] | Promise<Todo[]>;
}

export interface Todo {
    id: string;
    title: string;
}
