interface User {
  nickname: string;
  name: string;
  email: string;
  password: string;
}

interface UserLogin {
  nickname:string
  email: string;
  password: string;
}



export type { User, UserLogin };
