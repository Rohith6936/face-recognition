import Group from '../models/Group.js';

export const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        if (!name) {
            return res.status(400).json({ error: 'Group name is required' });
        }

        const group = new Group({
            name,
            description,
            createdBy: userId,
            members: [userId] // Add creator as first member
        });

        await group.save();
        res.status(201).json(group);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ error: 'Group name already exists' });
        }
        res.status(500).json({ error: 'Error creating group' });
    }
};

export const getGroups = async (req, res) => {
    try {
        const userId = req.user.id;
        const groups = await Group.find({ 
            $or: [
                { createdBy: userId },
                { members: userId }
            ]
        }).populate('members', 'username email');
        
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching groups' });
    }
};
