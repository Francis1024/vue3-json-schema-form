import { defineComponent, reactive } from 'vue'
import HelloWord from '@/components/HelloWord'
export default defineComponent({
  setup() {
    const state = reactive({ name: '咚咚' })
    return () => (
      <div>
        <div>{state.name} </div>
        <HelloWord msg={'HelloWorld'} />
      </div>
    )
  }
})
