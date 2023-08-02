const { getAllUsers } = require('../utils/dao')

class UserController {
    static async getAllUsers(req, res) {
        const dbUsers = await getAllUsers();
        return res.status(200).json(dbUsers)
    }
}

module.exports = UserController;