import { Exception } from "../exceptions";
import HistoryRepo from "../repository/historyRepo";

const getStats = async (userId1: string, userId2: string, difficulty: string, questionId: string) => {
    const stats = await HistoryRepo.getStats(userId1, userId2, difficulty, questionId);
    if (!stats) {
        throw new Exception(`No stats found for user ${userId1} and ${userId2} with difficulty ${difficulty} and questionId ${questionId}`, 404);
    }
    return {
        records: stats,
        numRecords: stats.length,
    }
};

const HistoryService = {
    getStats
};

export {HistoryService as default};
