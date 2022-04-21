<script setup>

defineProps({
  question: {
    type: String,
    required: true
  },
  score: {
    type: Number, 
    required: true
  },
  comments: {
    type: Number, 
    required: true
  } 
})
</script>

<template>
   <div class="rowItem">
      <span class="question">{{question}}</span>
      <span class="score"><img src="./icons/rating-outline.svg"/> {{score}}</span>
      <span class="comments"><img class="imgComment" src="./icons/comment.svg" /> +{{comments}}</span>
  </div>

</template>

<style scoped>
  .rowItem {
    display: flex;
    flex-direction: row;
    gap:2rem;
    align-items: center;
    padding-bottom: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-top: 1px solid var(--vt-c-divider-light-1);
   
  }

  span {
    flex-grow:1;
  }

  .question {
    flex-grow: 5;
    max-width:50%
  }
  .score {
    font-weight: bold;
  }
  .comments {
    color: var(--vt-c-purple)
  }

  .imgComment {
    width:15px;
    filter: invert(31%) sepia(10%) saturate(6254%) hue-rotate(208deg) brightness(92%) contrast(94%);
  }
</style>

