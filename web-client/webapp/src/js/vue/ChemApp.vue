<template>
  <div>
    <chem-input :name="name" :value.sync="value" @drawChema="onDrawChema($event)"></chem-input>
    <span>{{ value }}</span>
  </div>
</template>

<script>
  import ChemInput from './components/Input'

  export default {
    components: {
      ChemInput
    },
    data () {
      return {
        name: 'Denys',
        value: 'Qc'
      }
    },
    created () {
      console.log('element created')
    },
    methods: {
      // ToDo: may remove it
      onDrawChema (data) {
        console.log('draw Chema')
      }
    }

  }
</script>

<style scoped>

</style>
