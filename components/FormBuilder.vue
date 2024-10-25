<template>
  <div class="flex gap-4 p-4">
    <!-- Elements Palette -->
    <div class="w-64 bg-white p-4 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Form Elements</h2>
      <draggable
        :list="store.availableElements"
        :group="{ name: 'elements', pull: 'clone', put: false }"
        item-key="type"
        :clone="cloneElement"
        class="space-y-2"
      >
        <template #item="{ element }">
          <div class="p-2 bg-gray-100 rounded cursor-move hover:bg-gray-200">
            {{ element.label }}
          </div>
        </template>
      </draggable>
    </div>

    <!-- Form Preview -->
    <div class="flex-1 bg-white p-4 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Form Preview</h2>
      <draggable
        v-model="store.formElements"
        group="elements"
        item-key="id"
        class="min-h-[200px] space-y-4"
      >
        <template #item="{ element }">
          <div class="relative p-4 border rounded group">
            <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button @click="editElement(element.id)" class="text-blue-500 mr-2">Edit</button>
              <button @click="store.removeElement(element.id)" class="text-red-500">Remove</button>
            </div>
            <component
              :is="element.component"
              v-bind="element.props"
              :disabled="true"
            />
          </div>
        </template>
      </draggable>
    </div>

    <!-- Properties Panel -->
    <div v-if="store.selectedElement" class="w-64 bg-white p-4 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Properties</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Label</label>
          <input
            v-model="store.selectedElement.props.label"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            @input="updateSelectedElement('label', $event.target.value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="store.selectedElement.props.name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            @input="updateSelectedElement('name', $event.target.value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Help Text</label>
          <input
            v-model="store.selectedElement.props.helpText"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            @input="updateSelectedElement('helpText', $event.target.value)"
          />
        </div>
        <div v-if="['select', 'radio', 'checkbox'].includes(store.selectedElement.type)">
          <label class="block text-sm font-medium text-gray-700">Options</label>
          <div 
            v-for="(option, index) in store.selectedElement.props.options" 
            :key="index" 
            class="flex gap-2 mt-2"
          >
            <input
              v-model="option.label"
              type="text"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Option label"
              @input="store.updateOption(store.selectedElement.id, index, option.label)"
            />
            <button 
              @click="store.removeOption(store.selectedElement.id, index)" 
              class="text-red-500"
            >×</button>
          </div>
          <button
            @click="store.addOption(store.selectedElement.id)"
            class="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
          >
            Add Option
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFormBuilderStore } from '~/stores/formBuilder'
import draggable from 'vuedraggable'

const store = useFormBuilderStore()

const cloneElement = (element) => {
  const clonedElement = {
    ...element,
    props: {
      ...element.props,
      options: element.props.options ? [...element.props.options] : []
    }
  }
  store.addElement(clonedElement)
  return clonedElement
}

const editElement = (elementId) => {
  store.selectElement(elementId)
}

const updateSelectedElement = (key, value) => {
  if (store.selectedElement) {
    store.updateElement(store.selectedElement.id, { [key]: value })
  }
}
</script>