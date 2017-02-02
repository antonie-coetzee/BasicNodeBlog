import Vue = require('vue')
// Declare the component's type
interface MyComponent extends Vue {
  message: string
  onClick (): void
}
export default {
  template: '<button @click="onClick">Click!</button>',
  data: function () {
    return {
      message: 'Hello!'
    }
  },
  methods: {
    onClick: function () {
      // TypeScript knows that `this` is of type MyComponent
      // and that `this.message` will be a string
      window.alert(this.message)
    }
  }
// We need to explicitly annotate the exported options object
// with the MyComponent type
} as Vue.ComponentOptions<MyComponent>
