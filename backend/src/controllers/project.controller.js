import * as projectService from "../services/project.service.js";

const PROJECT_DOMAINS = [
    "SOFTWARE",
    "CONSTRUCTION",
    "EDUCATION",
    "HEALTHCARE",
    "MANUFACTURING",
    "AGRICULTURE",
    "GOVERNMENT",
    "RESEARCH",
    "ENERGY",
    "FINANCE",
    "OTHER"
];

const PROJECT_STATUSES = [
    "PLANNING",
    "ACTIVE",
    "ON_HOLD",
    "COMPLETED",
    "CANCELLED"
];


export const createProject = async (req, res) => {
    try {
        const {
            name,
            description,
            domain,
            startDate,
            endDate
        } = req.body;

        if (!name || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Name, startDate and endDate are required"
            });
        }

        const selectedDomain = domain || "OTHER";

        if (!PROJECT_DOMAINS.includes(selectedDomain)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project domain"
            });
        }

        const project = await projectService.createProject({
            name,
            description,
            domain: selectedDomain,
            startDate,
            endDate,
            organizationId: req.user.organizationId,
            createdById: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getProjects(
            req.user.organizationId
        );

        res.status(200).json({
            success: true,
            data: projects
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getProjectById = async (req, res) => {
    try {
        const project = await projectService.getProjectById(
            req.params.id,
            req.user.organizationId
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateProject = async (req, res) => {
    try {
        const {
            name,
            description,
            domain,
            startDate,
            endDate,
            status
        } = req.body;

        if (domain && !PROJECT_DOMAINS.includes(domain)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project domain"
            });
        }

        if (status && !PROJECT_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project status"
            });
        }

        const result = await projectService.updateProject(
            req.params.id,
            req.user.organizationId,
            {
                name,
                description,
                domain,
                startDate,
                endDate,
                status
            }
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const project = await projectService.getProjectById(
            req.params.id,
            req.user.organizationId
        );

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const deleteProject = async (req, res) => {
    try {
        const result = await projectService.deleteProject(
            req.params.id,
            req.user.organizationId
        );

        if (result.count === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};