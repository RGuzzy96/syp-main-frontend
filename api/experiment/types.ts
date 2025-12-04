import { ComboboxOption } from "@/components/ui/menus/combobox";

export interface ExperimentConfig {
  dataset: ComboboxOption | null,
  taskType: ComboboxOption | null,
  algorithm: ComboboxOption | null,
  quantumMethod: ComboboxOption | null
}
