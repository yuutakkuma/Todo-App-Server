
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateTodoInput {
    title: string;
}

export interface RegisterUserInput {
    userName: string;
    email: string;
    password: string;
}

export interface IMutation {
    createTodo(input: CreateTodoInput): Todo | Promise<Todo>;
    deleteTodo(id: string): boolean | Promise<boolean>;
    registerUser(input?: RegisterUserInput): User | Promise<User>;
}

export interface IQuery {
    getTodoList(): Todo[] | Promise<Todo[]>;
    getUsers(): User[] | Promise<User[]>;
}

export interface Todo {
    id: string;
    title: string;
}

export interface User {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    todo?: Todo[];
}
