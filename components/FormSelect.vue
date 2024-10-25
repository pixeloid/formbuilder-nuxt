<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      :id="id"
      :name="name"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="helpText" class="mt-2 text-sm text-gray-500">{{ helpText }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: () => `select-${Date.now()}`
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
    type: [String, Number],
    default: ''
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

defineEmits(['update:modelValue'])
</script>