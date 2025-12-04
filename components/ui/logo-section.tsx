import { Badge } from "./badge";

export default function LogoSection({ light = false }: { light?: boolean }){
    return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-2xl bg-slate-800/70 ring-1 ring-white/10" />
          <div className="flex items-center gap-2">
            <span className={`text-lg font-semibold tracking-tight ${light ? 'text-white' : ''}`}>CyberClan</span>
            <Badge className="rounded-full bg-violet-600/20 text-violet-200">Quantum</Badge>
          </div>
        </div>
    )
}