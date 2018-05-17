<template>
    <div class="space">{{ id }}</div>
</template>

<script>
export default {
  name: 'Space',
  data () {
    return {
      code: 8
    }
  },
  created () {
    console.log('Space element created')
    if (!document.onkeydown) this.initKeyDown()
  },
  methods: {
    confirmed (evt) {
      this.code = evt.keyCode
      console.log('pressed ' + this.code)
    },
    initKeyDown () {
      document.onkeydown = (evt) => {
        evt = evt || window.event
        // if (evt.keyCode === 13) {
        this.confirmed(evt)
        // }
      }
      return 'initialize'
    }
  },
  computed: {
    id () {
      return this.$store.state.id
    }
  }
}
</script>

  <style lang="scss" scoped>
    $BG_CH_SPACE: aquamarine;
    .space {
      background: $BG_CH_SPACE;
    }
  </style>
