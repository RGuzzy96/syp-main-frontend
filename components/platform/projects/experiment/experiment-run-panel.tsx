'use client'

import { useEffect, useState } from 'react'
import ThemedCard from '@/components/ui/themed/themed-card'
import ThemedText from '@/components/ui/themed/themed-text'
import ThemedButton from '@/components/ui/themed/themed-button'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface RunStatus {
  progress: number
  logs: string[]
  done: boolean
  accuracy?: number
  timeTaken?: number
}

export default function ExperimentRunPanel({ autoStart = false }: { autoStart?: boolean }) {
  const [running, setRunning] = useState(autoStart)
  const [classical, setClassical] = useState<RunStatus>({ progress: 0, logs: [], done: false })
  const [quantum, setQuantum] = useState<RunStatus>({ progress: 0, logs: [], done: false })

  // helper to simulate training progress
  const simulateLoop = (
    setter: React.Dispatch<React.SetStateAction<RunStatus>>,
    label: string
  ) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      setter((prev) => ({
        ...prev,
        progress: Math.min(progress, 100),
        logs: [
          ...prev.logs,
          `${label}: epoch ${Math.floor(progress)}% complete — loss ${(Math.random() * 0.5 + 0.2).toFixed(3)}`,
        ],
      }))

      if (progress >= 100) {
        clearInterval(interval)
        setter((prev) => ({
            ...prev,
            progress: 100,
            done: true,
            accuracy: parseFloat(
            (Math.random() * 0.1 + (label === 'Quantum' ? 0.88 : 0.82)).toFixed(3)
            ),
            timeTaken: parseFloat((Math.random() * 4 + 3).toFixed(1)),
            logs: [...prev.logs, `${label}: training completed successfully.`],
        }))
      }
    }, 800 + Math.random() * 500)
  }

  useEffect(() => {
    if (running) {
      simulateLoop(setClassical, 'Classical')
      simulateLoop(setQuantum, 'Quantum')
    }
  }, [running])

  const reset = () => {
    setRunning(false)
    setClassical({ progress: 0, logs: [], done: false })
    setQuantum({ progress: 0, logs: [], done: false })
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left: Classical */}
      <ThemedCard>
        <div className="flex flex-col gap-y-3">
          <ThemedText className="font-semibold text-lg">Classical Model</ThemedText>

          {/* Progress */}
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-3 bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${classical.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Logs */}
          <div className="h-40 overflow-y-auto bg-gray-50 rounded-md p-2 text-xs font-mono border border-gray-200">
            {classical.logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>

          {/* Final Results */}
          {classical.done && (
            <div className="mt-2 text-sm">
              <p>✅ Accuracy: <b>{classical.accuracy}</b></p>
              <p>⏱️ Time: <b>{classical.timeTaken}s</b></p>
            </div>
          )}
        </div>
      </ThemedCard>

      {/* Right: Quantum */}
      <ThemedCard>
        <div className="flex flex-col gap-y-3">
          <ThemedText className="font-semibold text-lg">Hybrid Quantum Model</ThemedText>

          {/* Progress */}
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-3 bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${quantum.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Logs */}
          <div className="h-40 overflow-y-auto bg-gray-50 rounded-md p-2 text-xs font-mono border border-gray-200">
            {quantum.logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>

          {/* Final Results */}
          {quantum.done && (
            <div className="mt-2 text-sm">
              <p>✅ Accuracy: <b>{quantum.accuracy}</b></p>
              <p>⏱️ Time: <b>{quantum.timeTaken}s</b></p>
            </div>
          )}
        </div>
      </ThemedCard>

      {/* Controls */}
      <div className="col-span-full flex justify-center mt-4">
        {!running && !(classical.done && quantum.done) ? (
          <ThemedButton onClick={() => setRunning(true)}>Start Training</ThemedButton>
        ) : (
          <ThemedButton onClick={reset}>Reset</ThemedButton>
        )}
      </div>

      {/* Comparison when both done */}
      {classical.done && quantum.done && (
        <motion.div
          className="col-span-full mt-4 p-4 border rounded-xl bg-white shadow-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ThemedText className="text-lg font-semibold mb-1">Performance Comparison</ThemedText>
          <p>
            Quantum achieved <b>{(quantum.accuracy! * 100).toFixed(1)}%</b> accuracy vs Classical{' '}
            <b>{(classical.accuracy! * 100).toFixed(1)}%</b> in roughly{' '}
            <b>{Math.round((classical.timeTaken! / quantum.timeTaken!) * 100)}%</b> of the time.
          </p>
        </motion.div>
      )}
    </div>
  )
}