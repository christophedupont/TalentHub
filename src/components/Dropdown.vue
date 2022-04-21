<script>

import Measurements from '../api/measurements/Measurements.js';
import { onMounted, ref, computed } from 'vue';

export default {
    name: 'Dropdown',

    setup(){

        const questionsArrayRef = ref({});

        async function fetchReplies(){

            let questions = await Measurements.questions();
           
            questionsArrayRef.value = questions.data.questions;

        }


        onMounted(() => {
            fetchReplies();
        });

        return {
            questionsArrayRef
        }
    },

    data(){
        return {
            selected: null
        }
    },

};

</script>


<template>
    <div class="container">  
        <h2>Filter</h2>
        <select v-model="selected" @change="$emit('filterChange', selected)">
            <option :value="null">None</option>
            <option v-for="q in questionsArrayRef" :key="q.id" :value="q.id">{{q.name}}</option>
        </select>
       
    </div>

</template>

<style scoped>

</style>

