export default function DocsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold">Docs</h1>
      <h2 id="architecture" className="mt-8 text-xl font-semibold">System architecture</h2>
      <p className="mt-2 text-slate-400">Next.js → Express (router) → FastAPI (quantum orchestrator) → Qiskit/AWS Braket.</p>
      <h2 id="api" className="mt-8 text-xl font-semibold">API</h2>
      <p className="mt-2 text-slate-400">/runs/start, /runs/status, /runs/stop, /runs/logs (to be defined).</p>
      <h2 id="safety" className="mt-8 text-xl font-semibold">Safety & disclaimers</h2>
      <p className="mt-2 text-slate-400">Demo uses tiny keys; educational only. Link to NIST PQC.</p>
    </main>
  );
}
