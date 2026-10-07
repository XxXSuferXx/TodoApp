export const ROUTES = {
    home: "/",
    todos: "/todos",
    todoDetail: "/todos/:todoId",
    login: "/login",
    admin: "/admin",
    forbidden: "/forbidden"
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]

//Builds "/todos/abc123" from the params
export function todoDetailPath(todoId: string): string {
  return ROUTES.todoDetail.replace(":todoId", todoId);
}