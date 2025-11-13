import userService from '../services/userService.js';

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('GET /usuarios', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('GET /usuarios/:id', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error('POST /usuarios', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      console.error('PUT /usuarios/:id', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json(result);
    } catch (error) {
      console.error('DELETE /usuarios/:id', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}

export default new UserController();