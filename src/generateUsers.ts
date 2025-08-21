#!/usr/bin/env node

import { FileManager } from './utils/fileManager';
import { UserGenerator } from './utils/userGenerator';

const fileManager = new FileManager();

function generateUsers() {
  console.log('🎲 User Data Generator');
  console.log('=====================');

  // Get count from command line arguments or default to 10
  const args = process.argv.slice(2);
  const count = args.length > 0 ? parseInt(args[0]) : 10;

  if (isNaN(count) || count < 1 || count > 100) {
    console.error('❌ Please provide a valid number between 1 and 100');
    process.exit(1);
  }

  try {
    console.log(`📝 Generating ${count} sample users...`);
    
    const users = UserGenerator.generateUsers(count);
    fileManager.saveUsers(users);
    
    console.log('✅ Sample users generated successfully!');
    console.log(`📊 Total users created: ${users.length}`);
    console.log('📁 Data saved to: data/users.json');
    
    // Display first few users as preview
    console.log('\n👥 Preview of generated users:');
    console.log('==============================');
    users.slice(0, Math.min(3, users.length)).forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`   📧 ${user.email}`);
      console.log(`   🏢 ${user.occupation} in ${user.city}, ${user.country}`);
      console.log(`   📅 Joined: ${user.joinDate}`);
      console.log('');
    });

    if (users.length > 3) {
      console.log(`... and ${users.length - 3} more users`);
    }

  } catch (error) {
    console.error('❌ Error generating users:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateUsers();
}