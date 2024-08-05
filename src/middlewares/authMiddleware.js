const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');

exports.auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ message: 'Authentication required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employee.findById(decoded.id);
        if (!employee) {
            throw new Error();
        }
        req.employee = employee;
        next();
    } catch (err) {
        res.status(401).send({ message: 'Invalid token' });
    }
};
