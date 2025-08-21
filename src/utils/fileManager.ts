import * as fs from 'fs';
import * as path from 'path';
import { User, UserData } from '../types/User';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

export class FileManager {
  constructor() {
    this.ensureDataDirectory();
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('📁 Created data directory');
    }
  }

  public saveUsers(users: User[]): void {
    try {
      const userData: UserData = {
        users,
        totalUsers: users.length,
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(USERS_FILE, JSON.stringify(userData, null, 2));
      console.log(`✅ Successfully saved ${users.length} users to ${USERS_FILE}`);
    } catch (error) {
      console.error('❌ Error saving users:', error);
      throw new Error('Failed to save users to file');
    }
  }

  public loadUsers(): User[] {
    try {
      if (!fs.existsSync(USERS_FILE)) {
        console.log('📄 No users file found, returning empty array');
        return [];
      }

      const fileContent = fs.readFileSync(USERS_FILE, 'utf-8');
      const userData: UserData = JSON.parse(fileContent);
      
      console.log(`📖 Loaded ${userData.totalUsers} users from file`);
      return userData.users;
    } catch (error) {
      console.error('❌ Error loading users:', error);
      throw new Error('Failed to load users from file');
    }
  }

  public addUser(newUser: User): User[] {
    try {
      const existingUsers = this.loadUsers();
      
      // Check if user with same email already exists
      const existingUser = existingUsers.find(user => user.email === newUser.email);
      if (existingUser) {
        throw new Error(`User with email ${newUser.email} already exists`);
      }

      const updatedUsers = [...existingUsers, newUser];
      this.saveUsers(updatedUsers);
      
      console.log(`➕ Added new user: ${newUser.firstName} ${newUser.lastName}`);
      return updatedUsers;
    } catch (error) {
      console.error('❌ Error adding user:', error);
      throw error;
    }
  }

  public getUserById(id: string): User | null {
    try {
      const users = this.loadUsers();
      const user = users.find(user => user.id === id);
      
      if (user) {
        console.log(`🔍 Found user: ${user.firstName} ${user.lastName}`);
      } else {
        console.log(`❓ User with ID ${id} not found`);
      }
      
      return user || null;
    } catch (error) {
      console.error('❌ Error finding user:', error);
      throw new Error('Failed to find user');
    }
  }

  public updateUser(id: string, updates: Partial<User>): User | null {
    try {
      const users = this.loadUsers();
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        console.log(`❓ User with ID ${id} not found for update`);
        return null;
      }

      users[userIndex] = { ...users[userIndex], ...updates };
      this.saveUsers(users);
      
      console.log(`✏️ Updated user: ${users[userIndex].firstName} ${users[userIndex].lastName}`);
      return users[userIndex];
    } catch (error) {
      console.error('❌ Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  public deleteUser(id: string): boolean {
    try {
      const users = this.loadUsers();
      const userIndex = users.findIndex(user => user.id === id);
      
      if (userIndex === -1) {
        console.log(`❓ User with ID ${id} not found for deletion`);
        return false;
      }

      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);
      this.saveUsers(users);
      
      console.log(`🗑️ Deleted user: ${deletedUser.firstName} ${deletedUser.lastName}`);
      return true;
    } catch (error) {
      console.error('❌ Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  public getFileStats(): { exists: boolean; size?: number; lastModified?: Date } {
    try {
      if (!fs.existsSync(USERS_FILE)) {
        return { exists: false };
      }

      const stats = fs.statSync(USERS_FILE);
      return {
        exists: true,
        size: stats.size,
        lastModified: stats.mtime
      };
    } catch (error) {
      console.error('❌ Error getting file stats:', error);
      return { exists: false };
    }
  }
}