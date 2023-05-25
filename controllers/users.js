var connection = require('../connection');

exports.getAllUser = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const user = await connection.query(sql);
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
    const userId = req.params.id;
    try {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const results = await connection.query(sql, [userId]);
        if (results) {
            res.json({
                status_code: 200,
                message: 'Get User By Id Successfully',
                datas: results
            });
        } else {
            res.json({
                status_code: 404,
                message: 'User not found',
                datas: null
            });
        }
    } catch (error) {
        console.error('Error fetching user', error);
        res.json({
            status_code: 500,
            error: 'Error fetching user'
        });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const sql = 'DELETE FROM users WHERE id = ?';
        const results = await connection.query(sql, [userId]);
        res.json({
            status_code: 200,
            message: 'User Deleted successfully',
            datas: results
        });
    } catch (error) {
        console.error('Error deleting Pokemon', error);
        res.json({
            status_code: 500,
            error: 'Error deleting User'
        });
    }
};