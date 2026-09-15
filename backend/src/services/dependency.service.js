import prisma from "../config/database.js";

export const createDependency = async (taskId, dependsOnTaskId) => {
    return await prisma.taskDependency.create({
        data: {
            task: {
                connect: {
                    id: taskId
                }
            },
            dependsOnTask: {
                connect: {
                    id: dependsOnTaskId
                }
            }
        },
        include: {
            task: true,
            dependsOnTask: true
        }
    });
};

export const getDependencies = async (taskId) => {
    return await prisma.taskDependency.findMany({
        where: {
            taskId
        },
        include: {
            dependsOnTask: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export const deleteDependency = async (id, taskId) => {
    return await prisma.taskDependency.deleteMany({
        where: {
            id,
            taskId
        }
    });
};