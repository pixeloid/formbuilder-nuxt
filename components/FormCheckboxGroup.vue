<template>
  <div>
    <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-2 space-y-2">
      <div v-for="option in options" :key="option.value" class="flex items-center">
        <input
          :id="`${id}-${option.value}`"
          :name="name"
          type="checkbox"
          :value="option.value"
          :checked="(modelValue || []).includes(option.value)"
          @change="updateValue(option.value)"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label :for="`${id}-${option.value}`" class="ml-3 block text-sm font-medium text-gray-700">
          {{ option.label }}
        </label>
      </div>
    </div>
    <p v-if="helpText" class="mt-2 text-sm text-gray-500">{{ helpText }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    default: () => `checkbox-${Date.now()}`
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    default: () => []
  },
  helpText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
  const newValue = [...(props.modelValue || [])]
  const index = newValue.indexOf(value)
  
  if (index === -1) {
    newValue.push(value)
  } else {
    newValue.splice(index, 1)
  }
  
  emit('update:modelValue', newValue)
}
</script>