<script>
import TableItem from './TableItem.vue'
import Measurements from '../api/measurements/Measurements.js';
import { onMounted, ref, computed } from 'vue';

/* After completing the test, I realise that this part is very redundant with StrenthsTable.vue.
 * Should need to refactor this code to use the same logic as StrenthsTable.vue.
 */

export default {
    name: 'StrenthsTable',
    components: {
        TableItem
    },
    props: {
            filter:{
                type: Number,
                default: null
            },
        },
        watch: {
            filter: function(newFilter, oldFilter) {
                this.updateScores()
            }
        },
        setup(props){

            let repliesData = {};
            let questionsData = {}

            const questionsArrayRef = ref({});

            async function fetchReplies(){
                repliesData = await Measurements.replies()
                questionsData = await Measurements.questions();
                updateScores();

            }

            function updateScores(){
                let questionsArray = [];
                questionsData.data.questions.forEach(
                    question => {
                        //We add if the question is not filtered
                        if(question.id == props.filter || props.filter == null){
                            questionsArray[question.id] = question;
                            questionsArray[question.id].scores=[];
                            questionsArray[question.id].comments=0;
                        }
                    
                    }
                );
                repliesData.data.forEach(reply => {
                        //We loop through the replies 
                        reply.reply_questions.forEach(replyQuestion => {
                            //We add the score to the array if the question is not filtered
                            if(replyQuestion.question_id == props.filter || props.filter == null){
                                questionsArray[replyQuestion.question_id].scores.push(replyQuestion.value);
                                if(replyQuestion.text.length > 0) questionsArray[replyQuestion.question_id].comments++;
                            }
                        });
                    }
                );

                //We loop through the questions and calculate the average score
                questionsArray.forEach(question => {
                    question.average = question.scores.reduce((a, b) => a + b, 0) / question.scores.length;
                    //round Average with 1 decimal
                    question.averageRounded = Math.round(question.average * 10) / 10;
                });

                //Sort questionsArray by average
                questionsArray.sort((a, b) => a.average - b.average);

                //We keep only the 3 first questions
                questionsArray = questionsArray.slice(0,3);
                
        

                console.log(questionsArray);

                //Fix some length issues
                questionsArray.length= Object.keys(questionsArray).length;
                questionsArrayRef.value = questionsArray;

            }


            onMounted(() => {
                fetchReplies();
            });

            return {
                questionsArrayRef,
                fetchReplies,
                updateScores
            }
        }
    };
</script>


<template>
    <div class="container">  
        <div class="tableTitle">
            <img src="./icons/trend-down.svg"/>
            <div class="tableTitleText">
                 <h2>Areas for improvement</h2>
                 <span>Your three worst-performing questions</span>
            </div>
        </div>
       
        <div class="tableHead">
            <span>Question</span>
            <span>Score</span>
            <span>Comments</span>
        </div>
         <div class="tableContent">
            <TableItem v-for=" q in questionsArrayRef" :key="q.id" :question="q.name" :score="q.averageRounded" :comments="q.comments" />
        </div>
       
    </div>

</template>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        gap:2rem;
    }
    .tableTitle {
        display: flex;
        flex-direction: row;
        gap:2rem;
    }
    .tableTitleText {
        display: flex;
        flex-direction: column;
    }
    .tableTitleText h2{
        font-weight: bold;
    }

    .tableHead {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap:2rem;
       
    }

    .tableHead span {
        flex-grow:1;
        font-weight: bold;
      
    }
    .tableHead span:first-child {
        flex-grow: 4;
        max-width:50%
    }
</style>

