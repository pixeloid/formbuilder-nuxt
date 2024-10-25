import { defineStore } from 'pinia'

export interface FormElement {
  id: string
  type: string
  component: string
  props: {
    label: string
    name: string
    helpText: string
    type?: string
    options?: Array<{ label: string; value: string }>
  }
}

export const useFormBuilderStore = defineStore('formBuilder', {
  state: () => ({
    formElements: [] as FormElement[],
    selectedElementId: null as string | null,
    availableElements: [
      {
        type: 'text',
        component: 'FormInput',
        label: 'Text Input',
        props: {
          type: 'text',
          label: 'Text Input',
          name: '',
          helpText: '',
        }
      },
      {
        type: 'select',
        component: 'FormSelect',
        label: 'Select',
        props: {
          label: 'Select',
          name: '',
          helpText: '',
          options: []
        }
      },
      {
        type: 'radio',
        component: 'FormRadioGroup',
        label: 'Radio Group',
        props: {
          label: 'Radio Group',
          name: '',
          helpText: '',
          options: []
        }
      },
      {
        type: 'checkbox',
        component: 'FormCheckboxGroup',
        label: 'Checkbox Group',
        props: {
          label: 'Checkbox Group',
          name: '',
          helpText: '',
          options: []
        }
      }
    ] as Omit<FormElement, 'id'>[]
  }),

  getters: {
    selectedElement: (state) => 
      state.formElements.find(element => element.id === state.selectedElementId),
  },

  actions: {
    addElement(element: Omit<FormElement, 'id'>) {
      const newElement = {
        ...element,
        id: `element-${Date.now()}`,
        props: {
          ...element.props,
          options: element.props.options ? [...element.props.options] : []
        }
      }
      this.formElements.push(newElement)
    },

    removeElement(elementId: string) {
      const index = this.formElements.findIndex(e => e.id === elementId)
      if (index !== -1) {
        this.formElements.splice(index, 1)
      }
      if (this.selectedElementId === elementId) {
        this.selectedElementId = null
      }
    },

    updateElement(elementId: string, updates: Partial<FormElement['props']>) {
      const element = this.formElements.find(e => e.id === elementId)
      if (element) {
        element.props = { ...element.props, ...updates }
      }
    },

    selectElement(elementId: string | null) {
      this.selectedElementId = elementId
    },

    addOption(elementId: string) {
      const element = this.formElements.find(e => e.id === elementId)
      if (element && element.props.options) {
        element.props.options.push({
          label: 'New Option',
          value: `option-${Date.now()}`
        })
      }
    },

    removeOption(elementId: string, optionIndex: number) {
      const element = this.formElements.find(e => e.id === elementId)
      if (element && element.props.options) {
        element.props.options.splice(optionIndex, 1)
      }
    },

    updateOption(elementId: string, optionIndex: number, label: string) {
      const element = this.formElements.find(e => e.id === elementId)
      if (element && element.props.options) {
        element.props.options[optionIndex].label = label
        element.props.options[optionIndex].value = label.toLowerCase().replace(/\s+/g, '-')
      }
    }
  }
})