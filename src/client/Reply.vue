<template>
  <div class="reply">
    <div class="reply__header">
      <div>
        <span>{{ip_address}}</span>
      </div>
      <div>
        <time :datetime="created_on">{{created_on_formatted}}</time>  
      </div>
    </div>
    <div class="reply__section">
      <div class="reply__text">
        <span>{{text}}</span>  
      </div>
      <div class="reply__actions">
        <div class="reply__action">
          <font-awesome-icon :icon="['fas', 'flag']" size="2x" @click="$emit('reportreply')" />  
        </div>
        <div class="reply__action">
          <font-awesome-icon :icon="['fas', 'trash']" size="2x" @click="$emit('deletereply')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'reply',
    props: {
      ip_address: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      created_on_formatted: {
        type: String
      },
      created_on: {
        type: String,
        required: true
      }
    }
   }
</script>

<style lang="scss" scoped>
  
  .reply {
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0 0 1px 0 black;
    margin: 20px 20px 0px 20px;
    
    &__header {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      padding: 10px;
      color: gray;
      font-weight: bold;
    }
    
    &__section {
      display: flex;
      
    }
    
    &__text {
      flex: 1 1 auto;
      font-size: 15px;
    }
    
    &__actions {
      flex: 0 0 auto;
    }
    
    &__action {
      cursor: pointer;
      margin: 10px 0;
    }
  }
  
</style>