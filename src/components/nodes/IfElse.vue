<template>
  <div>
    <nodeHeader title="If - Else" />
    <el-label for="condition">Condition: </el-label>
    <el-input df-condition name="condition" type="text" v-model="condition" placeholder="boolean value" />

    <el-label for="ifSentence">If Sentence: </el-label>
    <el-input df-ifSentence name="ifSentence" type="text" v-model="ifSentence" placeholder="Write a Sentence" />

    <el-label for="elseSentence">Else Sentence: </el-label>
    <el-input df-elseSentence name="elseSentence" type="text" v-model="elseSentence" placeholder="Write a Sentence" />

  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import nodeHeader from './nodeHeader.vue';


export default defineComponent({
  name: "IfElse",
  components: {
    nodeHeader
  },
  setup() {
    const condition = ref("");
    const ifSentence = ref("");
    const elseSentence = ref("");

    return {
      condition,
      ifSentence,
      elseSentence
    };
  }
});
</script>

<style>
</style>