<template>

    <div>
        <nodeHeader title="Assignation" />
        <div>
            <!-- <label for="variable"></label> -->
            <input name="variable" type="text" v-model="variableName" @change=""
                placeholder="Ingresa el nombre de la variable: " df-variablename>
            <p>Variable: {{ variableName }}</p>
            <!-- <p>Valor : {{ variableValue }}</p> -->
        </div>
    </div>

</template>

<script>
import { ref, defineComponent  } from 'vue';

import nodeHeader from './nodeHeader.vue';

import { useStore } from 'vuex'


export default defineComponent({
    name: 'Assignation',
    components: {
        nodeHeader
    },
    setup() {
        const variableName = ref('');
        // const variableValue = ref(0);

        // drwaflow internal
        // const el = ref(null);
        // const nodeId = ref(0);
        // let df = null
        // const dataNode = ref({});

        // df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        // const updateNameVariable = (value) => {
        //     dataNode.value.data.variableName = value;
        //     df.updateNodeDataFromId(nodeId.value, dataNode.value);
        // };

        // onMounted( async () => { 
        //     nextTick()
        //     nodeId.value = el.value.parentElement.parentElement.id.slice(5)
        //     dataNode.value = df.getNodeFromId(nodeId.value)

        //     // guardar valores
        //     variableValue.value = dataNode.value.data.variableValue;
        //     variableName.value = dataNode.value.data.variableName;
        // });

        return {
            
            
            variableName,
            // variableValue,

            
        };
    }
});
</script>

<style>
</style>