import { ExperimentResultsRow, ExperimentsRow } from "@/types/rows.types";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { handleProcessRun } from "@/helpers/runs";

import ThemedCard from "@/components/ui/themed/themed-card";
import ThemedText from "@/components/ui/themed/themed-text";
import ThemedButton from "@/components/ui/themed/themed-button";

export default function ExperimentRun({
  experiment
}: {
  experiment: ExperimentsRow | null;
}) {
  const { session } = useAuth();

  const [results, setResults] = useState<{
    classical: ExperimentResultsRow | null;
    quantum: ExperimentResultsRow | null;
  }>({
    classical: null,
    quantum: null,
  });

  const [notRanYet, setNotRanYet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const loadExperimentResults = async (experimentId: string) => {

    try {
      const { data, error } = await supabase
        .from("experiment_results")
        .select("*")
        .eq("experiment_id", experimentId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (!data?.length) {
        setNotRanYet(true);
        setResults({ classical: null, quantum: null });
      } else {
        setNotRanYet(false);

        const classical = data.find((r) => r.type === "classical") || null;
        const quantum = data.find((r) => r.type === "quantum") || null;

        setResults({ classical, quantum });
      }
    } catch (err) {
      console.error("Error loading results:", err);
    } finally {
      setLoading(false);
      setIsRunning(false);
    }
  };

  const startExperiment = async (userId: string, experiment: ExperimentsRow) => {
    setIsRunning(true); 

    const resp = await handleProcessRun(userId, experiment);

    if (resp) {
      await loadExperimentResults(experiment.id);
    } else {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (session && experiment) {
      loadExperimentResults(experiment.id);
    }
  }, [session, experiment]);

  if (loading) return <ThemedText>Loading...</ThemedText>;

  const resultList = [results.classical, results.quantum].filter(Boolean) as ExperimentResultsRow[];

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      {session && experiment && (
        !isRunning ? (
          <ThemedButton
            className="w-fit"
            onClick={() => startExperiment(session.user.id, experiment)}
          >
            {notRanYet ? "Start Experiment" : "Rerun Experiment"}
          </ThemedButton>
        ) : (
          <div className="flex flex-row items-center gap-x-3 text-indigo-600 font-medium">
            <div className="h-4 w-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
            <ThemedText>Running experiment...</ThemedText>
          </div>
        )
      )}

      {resultList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resultList.map((r) => (
            <ThemedCard key={r.id}>
              <ThemedText className="font-semibold text-lg mb-1 capitalize">
                {r.type} Results
              </ThemedText>

              <ThemedText>Accuracy: {r.accuracy?.toFixed(4)}</ThemedText>

              {r.training_time !== null && (
                <ThemedText>
                  Training Time: {r.training_time.toFixed(4)}s
                </ThemedText>
              )}

              {"kernel_time" in r && r.kernel_time !== null && (
                <ThemedText>
                  Kernel Time: {r.kernel_time.toFixed(4)}s
                </ThemedText>
              )}

              {"total_time" in r && r.total_time !== null && (
                <ThemedText>
                  Total Time: {r.total_time.toFixed(4)}s
                </ThemedText>
              )}

              {r.logs && (
                <pre className="mt-3 bg-gray-900 text-gray-100 text-xs p-3 rounded max-h-64 overflow-y-auto whitespace-pre-wrap">
                  {r.logs.join("\n")}
                </pre>
              )}
            </ThemedCard>
          ))}
        </div>
      )}
    </div>
  );
}