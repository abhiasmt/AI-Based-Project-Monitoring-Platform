import {
    getOrganizationUsers,
    getUserById,
    updateUserRole
} from "../services/user.service.js";

const validRoles = [
    "ADMIN",
    "MANAGER",
    "TEAM_MEMBER",
    "STAKEHOLDER"
];

export const getTeamMembers = async (req, res) => {
    try {
        const users = await getOrganizationUsers(
            req.user.organizationId
        );

        return res.status(200).json({
            success: true,
            message: "Team members retrieved successfully",
            data: users
        });

    } catch (error) {
        console.error("Get team members error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve team members"
        });
    }
};

export const getTeamMemberById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid user ID is required"
            });
        }

        const user = await getUserById(
            id,
            req.user.organizationId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Team member retrieved successfully",
            data: user
        });

    } catch (error) {
        console.error("Get team member error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve team member"
        });
    }
};

export const changeUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!id || typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Valid user ID is required"
            });
        }

        if (!role || !validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        // Prevent admin from changing their own role
        if (id === req.user.userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot change your own role"
            });
        }

        const user = await getUserById(
            id,
            req.user.organizationId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        const result = await updateUserRole(
            id,
            req.user.organizationId,
            role
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        const updatedUser = await getUserById(
            id,
            req.user.organizationId
        );

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.error("Change user role error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update user role"
        });
    }
};