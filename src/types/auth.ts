export interface AuthForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  password: number;
  email: string;
  firstName: string;
  phoneNumber: number;
  cpassword?: number;
}
