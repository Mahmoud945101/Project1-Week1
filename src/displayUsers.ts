#!/usr/bin/env node

import { FileManager } from './utils/fileManager';
import { User } from './types/User';

const fileManager = new FileManager();

function displayUsers() {
  console.log('👥 User Data Display');
  console.log('===================');

  try {
    const users = fileManager.loadUsers();
    
    if (users.length === 0) {
      console.log('📭 No users found in the database.');
      console.log('💡 Run "npm run generate-users" to create sample data.');
      return;
    }

    console.log(`📊 Total users: ${users.length}`);
    console.log('');

    // Display statistics
    const activeUsers = users.filter(user => user.isActive).length;
    const avgAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
    
    console.log('📈 Statistics:');
    console.log(`   Active users: ${activeUsers}`);
    console.log(`   Inactive users: ${users.length - activeUsers}`);
    console.log(`   Average age: ${Math.round(avgAge * 100) / 100} years`);
    console.log('');

    // Group users by country
    const usersByCountry = users.reduce((acc, user) => {
      acc[user.country] = (acc[user.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('🌍 Users by country:');
    Object.entries(usersByCountry)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([country, count]) => {
        console.log(`   ${country}: ${count} users`);
      });
    console.log('');

    // Display all users
    console.log('👤 User Profiles:');
    console.log('================');
    
    users.forEach((user, index) => {
      const status = user.isActive ? '🟢 Active' : '🔴 Inactive';
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${status})`);
      console.log(`   🆔 ID: ${user.id}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🎂 Age: ${user.age} years old`);
      console.log(`   📍 Location: ${user.city}, ${user.country}`);
      console.log(`   🏢 Occupation: ${user.occupation}`);
      console.log(`   📞 Phone: ${user.phoneNumber}`);
      console.log(`   📅 Joined: ${user.joinDate}`);
      console.log('');
    });

    // File statistics
    const fileStats = fileManager.getFileStats();
    if (fileStats.exists) {
      console.log('📁 File Information:');
      console.log(`   Size: ${fileStats.size} bytes`);
      console.log(`   Last modified: ${fileStats.lastModified?.toLocaleString()}`);
    }

  } catch (error) {
    console.error('❌ Error displaying users:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  displayUsers();
}