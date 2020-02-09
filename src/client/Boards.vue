<template>
  <div v-if="!loading" class="boards">
    <div class="boards__header">
      <h2>
        Select Board
      </h2>  
    </div>
    <div class="boards__container">
      <div @click="goToBoard(board)" class="boards__item" :key="board.id" v-for="board in boards">
        <span>{{board.name}}</span>
      </div>
    </div>
  </div>
  <loading v-else />
</template>

<script>
  import Loading from './Loading.vue'
  import { getBoards } from './api'
  
  export default {
    name: 'boards',
    components: {
      Loading
    },
    data() {
      return {
        loading: true,
        boards: []
      }
    },
    methods: {
      goToBoard(board) {
        this.$router.push({ path: `/${board.name}`, params: { board }});
      }
    },
    mounted() {
      getBoards().then(({data}) => {
        this.boards = data;
        this.loading = false;
      })
    }
   }
</script>

<style lang="scss" scoped>
  .boards {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    &__container {
      flex: 1 1 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-gap: 3px;
    }
    
    &__header {
      flex: 0 0 auto;
      text-align: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
    }
    
    &__item {
      text-align: center;
      padding: 20px;
      font-size: 20px;
      border: 1px solid black;
      cursor: pointer;
      transition: opacity 0.3s ease-in;
      background: white;
      font-size: 25px;
      
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
  
</style>