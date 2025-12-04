import { ExperimentsRow } from "@/types/rows.types";
import { ExperimentConfig } from "@/api/experiment/types";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { runExperiment } from "@/api/experiment";

export default function ExperimentRun({ 
    experiment, 
    experimentConfig 
}: { 
    experiment: ExperimentsRow | null, 
    experimentConfig: ExperimentConfig | null
}){
    const { session } = useAuth();

    const startExperiment = async (userId: string, experiment: ExperimentsRow) => {
        console.log('Starting experiment for user: ', userId);
        const experimentProcessingTicketId = await runExperiment(userId, experiment);

        console.log('Experiment started with ticket: ', experimentProcessingTicketId);
    }

    useEffect(() => {
        if(session && experiment){
            startExperiment(session.user.id, experiment);
        }
    }, [experiment, session]);

    return (
        <div>

        </div>
    )
}