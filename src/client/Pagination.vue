<template>
  <div class="pagination">
    <ul v-if="numberofpages">
      <li @click="goToPage(page.number)" :class="{ 'pagination__item--active': page.number == currentpage, classname: classname !== '' }" class="pagination__item" :key="page" v-for="page in pages">{{page.number}}</li>  
    </ul>
  </div>
</template>

<script>
   export default {
    name: 'pagination',
    props: {
      classname: {
        type: String
      },
      currentpage: {
        type: Number,
        required: true
      },
      numberofpages: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        pages: []  
      }
    },
    methods: {
      goToPage(pageNumber) {
        if(pageNumber !== currentpage) {
           $emit('pagechange', pageNumber);
        }
      }
    },
    mounted() {
      if(this.numberofpages > 0) {
        this.pages = Array(this.numberofpages).fill(0).map((pr, index) => ({number: index + 1}));
      }
    }
   }
</script>

<style lang="scss" scoped>
  
  .pagination {
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      text-align: center;
      font-size: 20px;
    }
    
    &__item {
      display: inline-block;
      margin: 0 5px;
      padding: 10px;
      border-radius: 20px;
      
      &--active {
        background: black;
        color: white; 
      }
    }
  }
  
</style>