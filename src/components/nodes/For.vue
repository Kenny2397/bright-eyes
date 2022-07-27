<template>
    <div>
        <nodeHeader title="For" />
        <div>
            <el-label for="i" >i: </el-label>
            <el-input name="i" type="number" v-model="i" placeholder="i" df-i ></el-input>


            <el-label for="range">range(n): </el-label>
            <el-input name="range" type="number" v-model="range" placeholder="n" df-range ></el-input>

            <el-label for="sentence">Sentence: </el-label>        
            <el-input name="sentence" type="text" v-model="sentence" placeholder="Write a sentence" df-forSentence/>

        </div>
    </div>
</template>

<script>
import nodeHeader from './nodeHeader.vue';

import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'For',
    components: {
        nodeHeader
    },
    setup() {
        const i = ref(0);
        const range = ref(0);
        const sentence = ref('');

        

        return {
            i,
            range,
            sentence
        }
    }
});
</script>

<style>
</style>