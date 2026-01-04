export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  description: string;
}

export const users: User[] = [
  {
    id: 1,
    name: 'admin',
    email: 'test@gmail.com',
    password: '123456',
    phone: '+123456789',
    description: 'Test description',
  },
];
