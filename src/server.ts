import express from 'express';
import cors from 'cors';
import { FileManager } from './utils/fileManager';
import { UserGenerator } from './utils/userGenerator';
import { User } from './types/User';

const app = express();
const PORT = process.env.PORT || 3000;
const fileManager = new FileManager();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const users = fileManager.loadUsers();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const user = fileManager.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to find user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Add new user
app.post('/api/users', (req, res) => {
  try {
    const userData = req.body as Partial<User>;
    
    // Generate ID and join date if not provided
    const newUser: User = {
      id: userData.id || Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      age: userData.age || 0,
      city: userData.city || '',
      country: userData.country || '',
      occupation: userData.occupation || '',
      phoneNumber: userData.phoneNumber || '',
      joinDate: userData.joinDate || new Date().toISOString().split('T')[0],
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      avatar: userData.avatar
    };

    // Basic validation
    if (!newUser.firstName || !newUser.lastName || !newUser.email) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, and email are required'
      });
    }

    const users = fileManager.addUser(newUser);
    res.status(201).json({
      success: true,
      message: 'User added successfully',
      data: newUser,
      totalUsers: users.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  try {
    const updates = req.body as Partial<User>;
    const updatedUser = fileManager.updateUser(req.params.id, updates);
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  try {
    const deleted = fileManager.deleteUser(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Generate sample users
app.post('/api/generate-users', (req, res) => {
  try {
    const count = parseInt(req.body.count) || 10;
    if (count < 1 || count > 100) {
      return res.status(400).json({
        success: false,
        message: 'Count must be between 1 and 100'
      });
    }

    const newUsers = UserGenerator.generateUsers(count);
    const existingUsers = fileManager.loadUsers();
    const allUsers = [...existingUsers, ...newUsers];
    
    fileManager.saveUsers(allUsers);

    res.json({
      success: true,
      message: `Generated ${count} sample users`,
      data: newUsers,
      totalUsers: allUsers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get file statistics
app.get('/api/stats', (req, res) => {
  try {
    const users = fileManager.loadUsers();
    const fileStats = fileManager.getFileStats();
    
    const activeUsers = users.filter(user => user.isActive).length;
    const avgAge = users.length > 0 ? users.reduce((sum, user) => sum + user.age, 0) / users.length : 0;
    
    res.json({
      success: true,
      data: {
        totalUsers: users.length,
        activeUsers,
        inactiveUsers: users.length - activeUsers,
        averageAge: Math.round(avgAge * 100) / 100,
        fileSize: fileStats.size,
        lastModified: fileStats.lastModified,
        fileExists: fileStats.exists
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'User Data Manager API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 User Data Manager API Server');
  console.log('================================');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('   GET    /health              - Health check');
  console.log('   GET    /api/users           - Get all users');
  console.log('   GET    /api/users/:id       - Get user by ID');
  console.log('   POST   /api/users           - Add new user');
  console.log('   PUT    /api/users/:id       - Update user');
  console.log('   DELETE /api/users/:id       - Delete user');
  console.log('   POST   /api/generate-users  - Generate sample users');
  console.log('   GET    /api/stats           - Get file statistics');
  console.log('================================');
});