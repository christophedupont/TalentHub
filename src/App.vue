<script>

import ScoreChart from './components/ScoreChart.vue';
import StrenthsTable from './components/StrenthsTable.vue';
import ImprovmentsTable from './components/ImprovmentsTable.vue';
import Dropdown from './components/Dropdown.vue';


export default {
    name: 'App',
    components: {
        ScoreChart,
        StrenthsTable,
        ImprovmentsTable,
        Dropdown
    },
    data() {
      return {
        currentFilter: null,
      }
    }
   
};


</script>


<template>
  <header>
  </header>

  <main>


      <Dropdown @filter-change="(n) => currentFilter = n" class="dropdown"/>
      <ScoreChart class="scoreChart" :filter="currentFilter" />

      <div class="tables">
        <StrenthsTable class="table" :filter="currentFilter" />
        <ImprovmentsTable class="table" :filter="currentFilter" />
      </div>
     
  </main>
</template>

<style>
@import './assets/base.css';



#app {
 
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  display: flex;
  flex-direction:column;
}

.scoreChart, .dropdown{
  width:'100%';
  margin-bottom: 2rem;
}

.tables{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-content:stretch;
  gap:2rem;
}
.table {
  flex-grow: 1;

}

header {
  line-height: 1.5;
}

</style>
