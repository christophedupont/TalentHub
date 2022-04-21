


<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, LineElement, PointElement, CategoryScale, LinearScale, TimeScale, Filler } from 'chart.js'
import Measurements from '../api/measurements/Measurements.js';
import { onMounted, ref, computed } from 'vue';
import 'chartjs-adapter-moment';
ChartJS.register(Title, Tooltip, LineElement, PointElement, CategoryScale, LinearScale, TimeScale, Filler)

export default {
  name: 'ScoreChart',
  components: { Line },
  props: {
    filter:{
      type: Number,
      default: null
    },
    chartId: {
      type: String,
      default: 'score-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
     height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {  filler: { propagate: true}}
    },
    
  },
  data() {


    return {
      
      chartOptions: {
        responsive: true,
        maintainAspectRatio:false,
        legend: {
          display: false
        },
        scales: {
         
          x: {
            grid: {
              display: false,
            },
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            beginAtZero:true,
             ticks: {
              precision: 0
            },
            grid: {
              display: false
            }
          },
        }
      }
    }
  },

  watch: {
    filter: function(newFilter, oldFilter) {
      this.updateChartData()
    }
  },
  
  setup(props){

   
    let replies = {};
    const chartData = ref({});

    async function fetchReplies(){
      replies = await Measurements.replies();
      updateChartData();
    }

    function updateChartData(){


      let repliesThroughTime = [];

      if(replies.data!==undefined && replies.data.length){
        // We loop through all replies
        replies.data.forEach(reply => {
          let timestamp = new Date(reply.created_at);
          if(repliesThroughTime[timestamp]===undefined){
            repliesThroughTime[timestamp]=[];
          }

          //We loop through the replies and add the score to the array
          reply.reply_questions.forEach(replyQuestion => {
            //we check if the question is the one we want to filter
            if(props.filter===null || replyQuestion.question_id===props.filter){
              repliesThroughTime[timestamp].push(replyQuestion.value);
            }
          });
          

        });
        //we calculate for each timestamp the average score
        for(let timestamp in repliesThroughTime){
          let sum=0;
          repliesThroughTime[timestamp].forEach(score => {
            sum+=score;
          });
          repliesThroughTime[timestamp]=sum/repliesThroughTime[timestamp].length;
        }


        
      }

      chartData.value = {
          labels: Object.keys(repliesThroughTime),
          datasets: [{
            pointRadius: 0,
            fill: {value:0},
            data: Object.values(repliesThroughTime),
            tension: 0.1,
            borderColor: '#434cab'
          }]
        }
  
      
    }


    onMounted(() => {
      fetchReplies();
      
    });

    return {
      replies,
      fetchReplies,
      chartData,
      updateChartData,
      chartId: props.chartId,
      datasetIdKey: props.datasetIdKey,
      height: props.height,
      width: props.width,
      cssClasses: props.cssClasses,
      styles: props.styles,
      plugins: props.plugins
    }
  },
 
}
</script>


<template>
  <div class="container">  
    <h2>Candidate Promoter Score (CPS) </h2>
     <Line
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :height="200"
      :width="width"
    />

  </div>

</template>

<style scoped>
  
</style>