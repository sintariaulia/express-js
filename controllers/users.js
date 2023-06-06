const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.getAllUsers();
        res.json({
            status_code: 200,
            message: 'Get All User Successfully',
            datas: user
        });
    } catch (error) {
        console.error('Error fetching users', error);
        res.json({
            status_code: 500,
            error: 'Error fetching users'
        });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.getUserById(id);
        if (user) {
            res.json({
                status_code: 200,
                message: 'Get User By Id Successfully',
                datas: user
            });
        } else {
            res.json({
                status_code: 404,
                message: 'User Not Found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error Fetching User', error);
        res.json({
            status_code: 500,
            error: 'Error fetching user'
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.deleteUser(id);
        res.json({
            status_code: 204,
            message: 'User Deleted successfully',
            datas: user
        });
    } catch (error) {
        console.error('Error Deleting Pokemon', error);
        res.json({
            status_code: 500,
            error: 'Error deleting User',
            datas: null
        });
    }
};