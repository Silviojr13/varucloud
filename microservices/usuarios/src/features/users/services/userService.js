import prisma from '../../../database.js';

class UserService {
  async getAllUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error(`Failed to retrieve users: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id }
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      throw new Error(`Failed to retrieve user: ${error.message}`);
    }
  }

  async createUser(userData) {
    try {
      return await prisma.user.create({
        data: userData
      });
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: userData
      });
      
      return user;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      await prisma.user.delete({
        where: { id }
      });
      
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}

export default new UserService();