<template>
  <div>
    <slot :date="date" :time="time" :dateTime="dateTime">
      {{ dateTime }}
    </slot>
  </div>
</template>

<script>
export default {
  name: "DateFormatter",
  props: {
    value: {
      type: [Date, String],
      default: () => new Date(),
    },
    locale: {
      type: String,
      default: "ru",
    },
  },
  computed: {
    localValue() {
      return new Date(this.value)
    },
    date() {
      return this.localValue.toLocaleDateString(this.locale)
    },
    time() {
      return this.localValue.toLocaleTimeString(this.locale)
    },
    dateTime() {
      return this.localValue.toLocaleString(this.locale)
    },
  },
}
</script>

<style scoped></style>
