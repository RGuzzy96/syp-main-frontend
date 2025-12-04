'use client'

import { useEffect, useState } from 'react'
import ThemedButton from '@/components/ui/themed/themed-button'
import Table, { TableConfigProps } from '@/components/ui/table'
import { supabase } from '@/lib/supabase'
import SidePanel from '@/components/ui/side-panel'
import DropdownMenu, { DropdownOption } from '@/components/ui/menus/dropdown-menu'
import { BiDotsVertical } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import SectionHeader from '@/components/ui/section-header'
import { ExperimentsRow, ProjectsRow } from '@/types/rows.types'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function ProjectComponent({ id }: { id: string }) {
  const router = useRouter()
  const [project, setProject] = useState<ProjectsRow | null>(null)
  const [experiments, setExperiments] = useState<ExperimentsRow[]>([])
  const [loading, setLoading] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [newExperiment, setNewExperiment] = useState({
    name: '',
    description: '',
  })

  const { session } = useAuth();

  const loadProjectAndExperiments = async () => {
    if (!id) return
    setLoading(true)

    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (!projectError && projectData) setProject(projectData)

    const { data: expData, error: expError } = await supabase
      .from('experiments')
      .select('*')
      .eq('project_id', id)
      .order('created_at', { ascending: false })

    if (!expError && expData) setExperiments(expData)

    setLoading(false)
  }

  const handleDeleteExperiment = async (item: ExperimentsRow) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete the experiment "${item.name}"?`
    )
    if (!confirmDelete) return
    const { error } = await supabase.from('experiments').delete().eq('id', item.id)
    if (!error) {
      setExperiments((prev) => prev.filter((e) => e.id !== item.id))
    } else {
      console.error('Error deleting experiment:', error)
    }
  }

  const handleCreateExperiment = async () => {
    if (!newExperiment.name.trim() || !project) return
    const { error } = await supabase.from('experiments').insert([
      {
        project_id: project.id,
        name: newExperiment.name.trim(),
        description: newExperiment.description.trim(),
        user_id: session?.user?.id
      },
    ])
    if (!error) {
      setPanelOpen(false)
      setNewExperiment({ name: '', description: '' })
      loadProjectAndExperiments()
    } else console.error(error)
  }

  const getDropdownOptions = (item: ExperimentsRow): DropdownOption[] => [
    {
      text: 'Delete',
      icon: BsTrash,
      danger: true,
      action: {
        type: 'button',
        onClick: (i) => handleDeleteExperiment(i),
      },
    },
  ]

  const tableConfig: TableConfigProps = {
    gridCols: 'grid-cols-8',
    cols: [
      {
        span: 'col-span-2',
        header: { display: 'Name' },
        cell: { type: 'prop', element: 'name' },
      },
      {
        span: 'col-span-3',
        header: { display: 'Description' },
        cell: { type: 'prop', element: 'description', placeholder: '—' },
      },
      {
        span: 'col-span-2',
        header: { display: 'Created' },
        cell: {
          type: 'prop',
          element: 'created_at',
          dateFormatting: 'MMM d, yyyy',
        },
      },
      {
        span: 'col-span-1',
        header: { display: '' },
        cell: {
          type: 'element',
          element: (item: ExperimentsRow) => (
            <div className="w-full flex flex-row justify-center">
              <DropdownMenu
                buttonDisplay={<BiDotsVertical className="size-4" />}
                options={getDropdownOptions(item)}
                itemProp={item}
              />
            </div>
          ),
        },
      },
    ],
  }

  useEffect(() => {
    loadProjectAndExperiments()
  }, [id])

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-row justify-between items-start">
        <SectionHeader
          back={() => router.push('/app/projects')}
          title={project?.name ?? 'Project'}
        />
        <ThemedButton onClick={() => setPanelOpen(true)}>+ New</ThemedButton>
      </div>

      <div className="mt-4">
        <Table
          config={tableConfig}
          rows={experiments}
          loading={loading}
          emptyMessage="No experiments found"
          rowLink={(item) => `/app/projects/${id}/${item.id}`}
        />
      </div>

      {/* Create Experiment Side Panel */}
      <SidePanel open={panelOpen} onClose={setPanelOpen} title="New Experiment">
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Name
          </label>
          <input
            type="text"
            value={newExperiment.name}
            onChange={(e) =>
              setNewExperiment({ ...newExperiment, name: e.target.value })
            }
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 p-2 text-white outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Enter experiment name"
          />

          <label className="block text-sm font-medium text-neutral-400 mt-4 mb-2">
            Description
          </label>
          <textarea
            value={newExperiment.description}
            onChange={(e) =>
              setNewExperiment({ ...newExperiment, description: e.target.value })
            }
            rows={4}
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 p-2 text-white outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Describe your experiment (optional)"
          />

          <div className="mt-6 flex justify-end gap-x-3">
            <ThemedButton type="secondary" onClick={() => setPanelOpen(false)}>
              Cancel
            </ThemedButton>
            <ThemedButton onClick={handleCreateExperiment}>Create</ThemedButton>
          </div>
        </div>
      </SidePanel>
    </div>
  )
}