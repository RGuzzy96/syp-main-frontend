'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SectionHeader from '@/components/ui/section-header'
import { supabase } from '@/lib/supabase'
import { ExperimentsRow, ExperimentsUpdate } from '@/types/rows.types'
import NavTabs, { TabOption } from '@/components/ui/nav-tabs'
import ThemedText from '@/components/ui/themed/themed-text'
import ThemedButton from '@/components/ui/themed/themed-button'
import ThemedCard from '@/components/ui/themed/themed-card'
import ComboboxComponent, { ComboboxOption } from '@/components/ui/menus/combobox'
import { AnimatePresence, motion } from 'framer-motion'
import { BsChevronRight } from 'react-icons/bs'
import { MdOutlinePlayArrow, MdPlayArrow } from 'react-icons/md'
import { toast } from 'react-toastify'
import ExperimentRun from './run/experiment-run'

const tabOptions: TabOption[] = [
  { displayName: 'Details', value: 'details' },
  { displayName: 'Run', value: 'run' },
]

export default function ExperimentMain({ id }: { id: string }) {
  const router = useRouter()
  const [experiment, setExperiment] = useState<ExperimentsRow | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState<TabOption>(tabOptions[0])
  const [showConfig, setShowConfig] = useState(false);

  const [config, setConfig] = useState({
    dataset: null as ComboboxOption | null,
    taskType: null as ComboboxOption | null,
    algorithm: null as ComboboxOption | null,
    quantumMethod: null as ComboboxOption | null,
  })

  const datasets: ComboboxOption[] = [
    { id: 'iris', name: 'Iris' },
    { id: 'wine', name: 'Wine Quality' },
    { id: 'breast', name: 'Breast Cancer' },
    { id: 'digits', name: 'Digits (0 vs 1)' },
  ]

  const taskTypes: ComboboxOption[] = [
    { id: 'classification', name: 'Classification' },
    { id: 'regression', name: 'Regression' },
  ]

  const algorithms: ComboboxOption[] = [
    { id: 'svm', name: 'Support Vector Machine (SVM)' },
    { id: 'rf', name: 'Random Forest' },
    { id: 'nn', name: 'Neural Network' },
  ]

  const quantumMethods: ComboboxOption[] = [
    { id: 'qkernel', name: 'Quantum Kernel' },
    { id: 'vqc', name: 'Variational Quantum Classifier (VQC)' },
    { id: 'qnn', name: 'Quantum Neural Network (QNN)' },
  ]

  const loadExperiment = async () => {
    if (!id) return
    setLoading(true)
    const { data, error } = await supabase
      .from('experiments')
      .select('*')
      .eq('id', id)
      .single()

    if (!error && data) { 
        setExperiment(data);
        
        // see if we have config yet
        if (!data.dataset || !data.classical_algorithm || !data.quantum_method || !data.task_type){
            setShowConfig(true);
        } else {
            setShowConfig(false);
        }
        setConfig({
            dataset: data.dataset
                ? { id: data.dataset, name: data.dataset }
                : null,
            algorithm: data.classical_algorithm
                ? { id: data.classical_algorithm, name: data.classical_algorithm }
                : null,
            quantumMethod: data.quantum_method
                ? { id: data.quantum_method, name: data.quantum_method }
                : null,
            taskType: data.task_type
                ? { id: data.task_type, name: data.task_type }
                : null,
        });
    } else console.error('Error loading experiment:', error)
    setLoading(false)
  }

  const handleBack = () => {
    const pathParts = window.location.pathname.split('/')
    pathParts.pop()
    router.push(pathParts.join('/'))
  }

  useEffect(() => {
    loadExperiment()
  }, [id])

  const handleSave = async () => {
    if (!id) return;

    const updates: ExperimentsUpdate = {
      dataset: config.dataset?.name || null,
      task_type: config.taskType?.name || null,
      classical_algorithm: config.algorithm?.name || null,
      quantum_method: config.quantumMethod?.name || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('experiments')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error saving configuration:', error);
      alert('Failed to save configuration.');
      return;
    }

    toast.success('Experiment configuration updated successfully.')
    loadExperiment();
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-row justify-between items-start">
        <SectionHeader
          back={handleBack}
          title={experiment?.name ?? (loading ? 'Loading...' : 'Experiment')}
        />
      </div>

      <NavTabs
        tabOptions={tabOptions}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {/* DETAILS TAB CONTENT */}
      {selectedTab.value === 'details' && (
        <div className="mt-4 flex flex-col">
            <div onClick={() => setShowConfig(prev => !prev)} className='flex flex-row items-center gap-x-4 group cursor-pointer'>
                <ThemedText className="font-semibold text-lg mb-2">
                    Experiment Configuration
                </ThemedText>
                <ThemedText className='mb-1'>
                    <BsChevronRight className={`${showConfig ? 'rotate-90' : ''} transform duration-150 h-6 w-6 p-1.5 group-hover:bg-gray-100 rounded-full`} />
                </ThemedText>
            </div>
          

            {showConfig && <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.2, ease: 'easeIn' }}
                >
                    <ThemedCard>
                        <div className="flex flex-col gap-y-4">
                            <ComboboxComponent
                                label="Dataset"
                                options={datasets}
                                selected={config.dataset}
                                setSelected={(opt) => setConfig({ ...config, dataset: opt })}
                                placeholderText="Select dataset..."
                            />

                            <ComboboxComponent
                                label="Task Type"
                                options={taskTypes}
                                selected={config.taskType}
                                setSelected={(opt) => setConfig({ ...config, taskType: opt })}
                                placeholderText="Select task type..."
                            />

                            <ComboboxComponent
                                label="Classical Algorithm"
                                options={algorithms}
                                selected={config.algorithm}
                                setSelected={(opt) => setConfig({ ...config, algorithm: opt })}
                                placeholderText="Select classical algorithm..."
                            />

                            <ComboboxComponent
                                label="Quantum Method"
                                options={quantumMethods}
                                selected={config.quantumMethod}
                                setSelected={(opt) => setConfig({ ...config, quantumMethod: opt })}
                                placeholderText="Select quantum method..."
                            />

                            <div className="pt-4 flex justify-end">
                                <ThemedButton onClick={handleSave}>Save Configuration</ThemedButton>
                            </div>
                        </div>
                    </ThemedCard>                    
                </motion.div>
            </AnimatePresence>}

            <ThemedText className="font-semibold text-lg my-2">
                Status
            </ThemedText>
            <ThemedCard>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between items-center'>
                        <ThemedText>Not started.</ThemedText>
                        <ThemedButton onClick={() => setSelectedTab(tabOptions[1])} className='hover:bg-gray-100'>
                            <MdOutlinePlayArrow className='h-5 w-5' />
                        </ThemedButton>
                    </div>
                </div>
            </ThemedCard>
        </div>
      )}

        {selectedTab.value === 'run' && (
            <ExperimentRun experiment={experiment} />
        )}
    </div>
  )
}
