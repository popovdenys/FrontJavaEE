<template>
  <div @onkeypress="confirmed">
    <chem-input :name="name" :value.sync="value" @drawChema="onDrawChema($event)"></chem-input>
    <span>{{ value }}</span>
    <chem-space></chem-space>
  </div>
</template>

<script>
import ChemInput from './components/Input'
import ChemSpace from './components/Space'

export default {
  components: {
    ChemInput,
    ChemSpace
  },
  data () {
    return {
      name: 'Denys',
      value: 'Qc'
    }
  },
  created () {
    console.log('table element created')
  },
  methods: {
    // ToDo: may remove it
    onDrawChema (data) {
      console.log('draw Chema')
    },
    confirmed (e) {
      console.log('pressed Enter')
    }
  }

}
</script>

<style scoped>

</style>
