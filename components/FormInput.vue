<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
    <p v-if="helpText" class="mt-2 text-sm text-gray-500">{{ helpText }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: () => `input-${Date.now()}`
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  helpText: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>