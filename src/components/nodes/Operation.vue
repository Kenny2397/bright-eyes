<template>
    <div> 
        <nodeHeader title="Operation" />
    </div>
    <div>
        <el-select v-model="operation" placeholder="Select" @change="" df-operation>
            <el-option 
                v-for="option in options" 
                :key="option.value" 
                :label="option.label" 
                :value="option.value" 
            >
            </el-option>
        </el-select>
        <br><br>
        <div>

            <!-- <p df-n1 >Number 1: {{ n1 }}</p>
            <p df-n2>Number 2: {{ n2 }}</p> -->

        </div>
    </div>
</template>

<script>
import { defineComponent, readonly, ref } from 'vue'

import nodeHeader from './nodeHeader.vue';

export default defineComponent({
    name: 'Operation',
    components: {
        nodeHeader
    },
    // props: ['title'],
    setup() {
        // const n1 = ref(0);
        // const n2 = ref(0);
        const operation = ref('Add');
        
        const options = readonly([
            {
                value:'Add',
                label: 'Add'
            },
            {
                value: 'Sub',
                label: 'Sub'
            },
            {
                value: 'Multiply',
                label: 'Multiply'
            },
            {
                value: 'Divide',
                label: 'Divide',
            }
        ]);

        // drwaflow internal
        // const el = ref(null);
        // const nodeId = ref(0);
        // let df = null
        // const dataNode = ref({});


        // df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateOperation = (selec) => {
            operation.value = select
            console.log(operation.value)
        }

        // onMounted(async () => {
        //     await nextTick()
        //     nodeId.value = el.value.parentElement.parentElement.id.slice(5)
        //     dataNode.value = df.getNodeFromId(nodeId.value)

        //     operation.value = dataNode.value.data.operation;
        //     n1.value = dataNode.value.data.n1;
        //     n2.value = dataNode.value.data.n2;

        // });

        return {
            // n1,
            // n2,
            operation,
            options,
            updateOperation
        }
    }
});
</script>

