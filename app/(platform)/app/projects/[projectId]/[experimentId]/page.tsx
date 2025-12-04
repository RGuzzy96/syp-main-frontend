import ExperimentMain from "@/components/platform/projects/experiment/experiment-main";

export default async function ExperimentPage({ params }: { params: any }){
    
    const id = (await params)?.experimentId;
    
    return (
        <ExperimentMain id={id} />
    )
}