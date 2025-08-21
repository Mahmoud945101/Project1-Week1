export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  joinDate: string;
  isActive: boolean;
  avatar?: string;
}

export interface UserData {
  users: User[];
  totalUsers: number;
  lastUpdated: string;
}