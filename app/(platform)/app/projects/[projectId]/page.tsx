import ProjectComponent from "@/components/platform/projects/project";

export default async function ProjectPage({ params }: { params: any }){
    
    const id = (await params)?.projectId;
    
    return (
        <ProjectComponent id={id} />
    )
}