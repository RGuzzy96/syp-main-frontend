'use client'

import { useEffect, useState } from 'react'
import ThemedButton from '@/components/ui/themed/themed-button'
import ThemedText from '@/components/ui/themed/themed-text'
import Table, { TableConfigProps } from '@/components/ui/table'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import SidePanel from '@/components/ui/side-panel'
import DropdownMenu, { DropdownOption } from '@/components/ui/dropdown-menu'
import { BiDotsVertical } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'
import { ProjectsRow } from '@/types/rows.types'

export default function ProjectsMain() {
  const { session } = useAuth()
  const [projects, setProjects] = useState<ProjectsRow[]>([])
  const [loading, setLoading] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
  })

  const loadProjects = async () => {
    if (!session?.user?.id) return
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
    if (!error && data) setProjects(data)
    setLoading(false)
  }

  const handleDeleteProject = async (item: ProjectsRow) => {
    const confirmDelete = confirm(
      `Are you sure you want to delete the project "${item.name}"?`
    )
    if (!confirmDelete) return
    const { error } = await supabase.from('projects').delete().eq('id', item.id)
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== item.id))
    } else {
      console.error('Error deleting project:', error)
    }
  }

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) return
    const { error } = await supabase.from('projects').insert([
      {
        user_id: session?.user?.id,
        name: newProject.name.trim(),
        description: newProject.description.trim(),
      },
    ])
    if (!error) {
      setPanelOpen(false)
      setNewProject({ name: '', description: '' })
      loadProjects()
    } else console.error(error)
  }

  const getDropdownOptions = (item: ProjectsRow): DropdownOption[] => [
    {
      text: 'Delete',
      icon: BsTrash,
      danger: true,
      action: {
        type: 'button',
        onClick: (i) => handleDeleteProject(i),
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
          element: (item: ProjectsRow) => (
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
    loadProjects()
  }, [session])

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-row justify-between items-start">
        <ThemedText className="font-semibold text-3xl">Projects</ThemedText>
        <ThemedButton onClick={() => setPanelOpen(true)}>+ New</ThemedButton>
      </div>

      <div className="mt-4">
        <Table
          config={tableConfig}
          rows={projects}
          loading={loading}
          emptyMessage="No projects found"
          rowLink={(item) => `/projects/${item.id}`}
        />
      </div>

      {/* Create Project Side Panel */}
      <SidePanel open={panelOpen} onClose={setPanelOpen} title="New Project">
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Name
          </label>
          <input
            type="text"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 p-2 text-white outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Enter project name"
          />

          <label className="block text-sm font-medium text-neutral-400 mt-4 mb-2">
            Description
          </label>
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            rows={4}
            className="w-full rounded-md bg-neutral-800 border border-neutral-700 p-2 text-white outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Describe your project (optional)"
          />

          <div className="mt-6 flex justify-end gap-x-3">
            <ThemedButton type="secondary" onClick={() => setPanelOpen(false)}>
              Cancel
            </ThemedButton>
            <ThemedButton onClick={handleCreateProject}>Create</ThemedButton>
          </div>
        </div>
      </SidePanel>
    </div>
  )
}