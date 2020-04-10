
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateTodoInput {
    title: string;
}

export interface DeleteAccountInput {
    nickname: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    nickname: string;
    email: string;
    password: string;
}

export interface IMutation {
    createTodo(input: CreateTodoInput): boolean | Promise<boolean>;
    deleteTodo(id: string): boolean | Promise<boolean>;
    register(registerInput: RegisterInput): boolean | Promise<boolean>;
    login(loginInput: LoginInput): boolean | Promise<boolean>;
    testUserLogin(loginInput: LoginInput): boolean | Promise<boolean>;
    logOut(): boolean | Promise<boolean>;
    deleteAccount(deleteAccountInput: DeleteAccountInput): boolean | Promise<boolean>;
}

export interface IQuery {
    getTodoList(): Todo[] | Promise<Todo[]>;
    allTodoList(): Todo[] | Promise<Todo[]>;
    getUsers(): Users[] | Promise<Users[]>;
    me(): Users | Promise<Users>;
}

export interface Todo {
    id: string;
    userId: string;
    title: string;
}

export interface Users {
    id: string;
    nickname: string;
    email: string;
    loginstatus: boolean;
}
