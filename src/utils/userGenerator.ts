import { User } from '../types/User';

export class UserGenerator {
  private static readonly FIRST_NAMES = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
    'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle'
  ];

  private static readonly LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
  ];

  private static readonly CITIES = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle',
    'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City'
  ];

  private static readonly COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia',
    'Japan', 'South Korea', 'Brazil', 'Mexico', 'Italy', 'Spain', 'Netherlands',
    'Sweden', 'Norway', 'Denmark', 'Switzerland', 'Austria', 'Belgium', 'Ireland'
  ];

  private static readonly OCCUPATIONS = [
    'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Marketing Manager',
    'Sales Representative', 'Accountant', 'Teacher', 'Nurse', 'Doctor', 'Lawyer', 'Architect',
    'Graphic Designer', 'Project Manager', 'Business Analyst', 'Consultant', 'Writer', 'Artist',
    'Chef', 'Photographer', 'Musician', 'Therapist', 'Engineer', 'Researcher', 'Administrator'
  ];

  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private static generateEmail(firstName: string, lastName: string): string {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'];
    const domain = this.getRandomElement(domains);
    const emailPrefix = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    return `${emailPrefix}@${domain}`;
  }

  private static generatePhoneNumber(): string {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `+1 (${areaCode}) ${exchange}-${number}`;
  }

  private static generateJoinDate(): string {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  }

  public static generateUser(): User {
    const firstName = this.getRandomElement(this.FIRST_NAMES);
    const lastName = this.getRandomElement(this.LAST_NAMES);

    return {
      id: this.generateId(),
      firstName,
      lastName,
      email: this.generateEmail(firstName, lastName),
      age: Math.floor(Math.random() * 50) + 18, // Age between 18-67
      city: this.getRandomElement(this.CITIES),
      country: this.getRandomElement(this.COUNTRIES),
      occupation: this.getRandomElement(this.OCCUPATIONS),
      phoneNumber: this.generatePhoneNumber(),
      joinDate: this.generateJoinDate(),
      isActive: Math.random() > 0.1, // 90% chance of being active
      avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 100000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 100000}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`
    };
  }

  public static generateUsers(count: number): User[] {
    const users: User[] = [];
    const usedEmails = new Set<string>();

    for (let i = 0; i < count; i++) {
      let user = this.generateUser();
      
      // Ensure unique emails
      while (usedEmails.has(user.email)) {
        user = this.generateUser();
      }
      
      usedEmails.add(user.email);
      users.push(user);
    }

    return users;
  }
}