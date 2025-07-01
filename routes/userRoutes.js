    const express = require('express');
    const bcrypt = require('bcryptjs');
    const User = require('../models/User');

    const router = express.Router();

    // POST: Register
    router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: 'Email already exists' });

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashed, role });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
    });

    // POST: Login
    router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid password' });

        res.status(200).json({ msg: 'Login successful', user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
    });

    // GET: Admin view all users (optionally filter by role)
    router.get('/', async (req, res) => {
    try {
        const role = req.query.role;
        const filter = role ? { role } : {};

        const users = await User.find(filter).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to get users', error: err.message });
    }
    });

    // GET: View user profile by ID
    router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
    });

    // PUT: Update user profile by ID
    router.put('/:id', async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json({ msg: 'Profile updated', user });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
    });

    // DELETE: Delete user account by ID
    router.delete('/:id', async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ msg: 'User not found' });
        res.json({ msg: 'User account deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
    });

    module.exports = router;
