import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    age: Number,
    msg: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => <div class="hello">{props.msg}</div>
  }
})
