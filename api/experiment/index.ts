import { ExperimentsRow } from "@/types/rows.types";
import execute, { CallBack } from "..";

export async function runExperiment(
    userId: string, 
    experiment: ExperimentsRow, 
    callback?: CallBack
): Promise<string> {
    if (!userId || !experiment) {
        const error = new Error('User ID and Experiment are required to run an experiment.');
        if (callback) callback(null, error);
        throw error;
    }
    
    return execute('experiment', 'run', {
        method: 'POST',
        body: { user_id: userId, experiment },
        callback: callback
    });
}