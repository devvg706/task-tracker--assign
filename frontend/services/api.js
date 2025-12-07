
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ;

export const endpoints = {
  // auth
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",

  // tasks
  GET_TASKS: BASE_URL + "/tasks",                 
  CREATE_TASK: BASE_URL + "/tasks/createTask",    
  taskById: (id) => `${BASE_URL}/tasks/${id}`,
};
