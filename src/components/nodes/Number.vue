<template>
    <div>
        <nodeHeader title="Number" />

        <!-- v-model="numbervalue" -->

        <input 
            type="number" 
            placeholder="Ingresa un Numero" 
            v-model="numbervalue" 
            @change="updateNumber" 
            required
            df-numbervalue
        >

        <div>
            <h4>Value: {{ numbervalue }}</h4>
        </div>
    </div>

</template>

<script>


import { onMounted, ref, nextTick, getCurrentInstance, defineComponent } from 'vue'
import nodeHeader from './nodeHeader.vue';

import { useStore } from 'vuex';

export default defineComponent({
    name: 'Number',
    components: {
        nodeHeader
    },
    setup() {
        const numbervalue = ref(0);

        const store = useStore();

        // drwaflow internal
        const el = ref(null);
        const nodeId = ref(0);
        let df = null
        const dataNode = ref({});


        df = getCurrentInstance().appContext.config.globalProperties.$df.value;


        // functions

        // const updateNumber = (value) => {
        //     dataNode.value.data.numbervalue = value;
        //     df.updateNodeDataFromId(nodeId.value, dataNode.value);
        // }

        

        // onMounted(async () => {
        //     await nextTick()
        //     nodeId.value = el.value.parentElement.parentElement.id.slice(5)
        //     dataNode.value = df.getNodeFromId(nodeId.value)


        //     // numbervalue.value = dataNode.value.data.numbervalue;
        // });

        return {
            numbervalue,
            // updateNumber,
            
        }

    }
});
</script>

<style>
</style>