<template>
  <div class="table">
    <label>
      {{ name }}
    </label>
    <input type="text" :value="value" @input="onInput"/>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['name', 'value'],
  computed: {
    isValide () {
      return (this.value === 'ok')
    }
  },
  methods: {
    onInput (e) {
      this.$emit('update:value', e.target.value)
    },
    emitDrawChema () {
      this.$emit('drawChema', this.isValide)
    }
  },
  watch: {
    isValide () {
      console.log(this)
      this.emitDrawChema()
    }
  },
  mounted () {
    // ToDo: remove twins
    this.emitDrawChema()
  }
}
</script>

<style scoped>

</style>
