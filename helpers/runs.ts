import { runExperiment } from "@/api/experiment";
import { supabase } from "@/lib/supabase";
import { ExperimentResultsRow, ExperimentsRow, RunProcessingTicketsRow } from "@/types/rows.types";
import { poll } from "./poll";

const getProcessingTicket = async (correlationId: string) => {
    const { data, error } = await supabase
      .from('run_processing_tickets')
      .select('*')
      .eq("id", correlationId);

    if(error){
      throw error;
    }
    
    return data[0];
  }

export const handleProcessRun = async (userId: string, experiment: ExperimentsRow): Promise<any> => {
    try {
        const ticketId = await runExperiment(userId, experiment);

        if(ticketId){
            const result = await poll(
                async () => await getProcessingTicket(ticketId),
                {
                    interval: 2000,
                    timeout: 60000, // 1 minute
                    condition: (data: RunProcessingTicketsRow) => data?.status === "completed"
                }
            );

            return result;
        }
    } catch (error) { 
        console.error("Error processing run:", error);
    }
}