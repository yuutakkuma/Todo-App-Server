
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateTodoInput {
    title?: string;
}

export interface IMutation {
    crateTodo(createTodoInput?: CreateTodoInput): Todo | Promise<Todo>;
}

export interface IQuery {
    getTodoList(): Todo[] | Promise<Todo[]>;
}

export interface Todo {
    id: number;
    title: string;
}
