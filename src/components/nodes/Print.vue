<template>
  <nodeHeader title="Print" />
  <div>
    <!-- <h4>Value: {{ val }}</h4> -->
  </div>
</template>

<script>
import nodeHeader from './nodeHeader.vue';

import { getCurrentInstance, defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'Print',
  components: {
    nodeHeader
  },
  setup() {
    // const val = ref(0);
    
    

    // drawflow
    // let df = null;
    // const nodeId = ref(0);
    // const el = ref(null);
    // const dataNode = ref("hello perro");

    // df = getCurrentInstance().appContext.config.globalProperties.$df.value;

    


    return {
      // val
      // nodeId
    }
  }


});
</script>

<style>
</style>