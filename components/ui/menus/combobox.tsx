'use client'

import { useState } from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import ThemedText from '../themed/themed-text'

export interface ComboboxOption {
  id: string
  name: string
}

type ComboboxComponentProps = {
  options: ComboboxOption[]
  selected: ComboboxOption | null
  setSelected: (option: ComboboxOption | null) => void
  placeholderText?: string
  label?: string
}

export default function ComboboxComponent({
  options,
  selected,
  setSelected,
  placeholderText = 'Select...',
  label,
}: ComboboxComponentProps) {
  const [query, setQuery] = useState('')

  const filtered =
    query === ''
      ? options
      : options.filter((opt) =>
          opt.name.toLowerCase().includes(query.toLowerCase())
        )

  return (
    <div className="flex flex-col gap-y-1 w-full">
      {label && (
        <ThemedText className="text-sm font-medium text-neutral-700 mb-1">
          {label}
        </ThemedText>
      )}

      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          {/* Input field */}
          <ComboboxInput
            className={clsx(
              'w-full rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-8 text-sm text-neutral-900 shadow-sm',
              'focus:outline-none focus:ring-1 focus:ring-indigo-500'
            )}
            displayValue={(option: ComboboxOption) => option?.name ?? ''}
            placeholder={placeholderText}
            onChange={(event) => setQuery(event.target.value)}
          />

          {/* Dropdown button */}
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-4 w-4 text-neutral-500"
              aria-hidden="true"
            />
          </ComboboxButton>

          {/* Options dropdown */}
          {filtered.length > 0 && (
            <ComboboxOptions
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-neutral-200 shadow-lg focus:outline-none"
            >
              {filtered.map((opt) => (
                <ComboboxOption
                  key={opt.id}
                  value={opt}
                  className={({ active, selected }) =>
                    clsx(
                      'cursor-pointer select-none px-3 py-2 text-sm flex items-center gap-x-2',
                      active ? 'bg-indigo-50 text-indigo-700' : 'text-neutral-900'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {opt.name}
                      </span>
                      {selected && (
                        <CheckIcon className="h-4 w-4 text-indigo-600 ml-auto" />
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  )
}