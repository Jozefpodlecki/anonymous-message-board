<template>
  <div v-if="isopen" class="delete-thread-modal">
    <div class="delete-thread-modal__container">
      <div class="delete-thread-modal__header">
        <h1 class="delete-thread-modal__title">
          Delete thread
        </h1>
        <div class="delete-thread-modal__closeIcon">
          <font-awesome-icon :icon="['fas', 'times']" size="2x" @click="$emit('closemodal')" />
        </div>
      </div>
      <form @submit="submit" class="delete-thread-modal__form">
        <div class="delete-thread-modal__field">
          <input class="delete-thread-modal__input" required v-model="delete_password" type="text" placeholder="Enter password"/>
        </div>
        <div class="delete-thread-modal__field">
          <input class="delete-thread-modal__submit" type="submit" value="Delete"/>
        </div>
      </form>  
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'deletereplymodal',
    props: {
      isopen: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        delete_password: null
      }
    },
    methods: {
      submit(event) {
        this.$emit('deletethread', {
          delete_password: this.delete_password
        })
        
        event.preventDefault();
      }
    }
   }
</script>

<style lang="scss" scoped>
  @import '../mixings.scss';
  
  .delete-thread-modal {
    @include modal;
    
    /*
    &__container {
      width: 400px;
      height: 300px;
      background: white;
      border-radius: 50px;
      padding: 20px;
    }
    
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 10px;
    }
    
    &__closeIcon {
      margin: 0 20px;
      cursor: pointer;
      transition: opacity 0.3s ease-in;
      
      &:hover {
        opacity: 0.5;
      }
    }
    
    &__title {
      font-size: 20px;
      margin: 0;
    }
    
    &__field {
      margin: 10px 0;
    }
    
    &__submit {
      padding: 10px 20px;
      border: 1px solid black;
      background: white;
      border-radius: 30px;
      cursor: pointer;
      transition: opacity 0.3s ease-in;
      
      &:hover {
        opacity: 0.8;
      }
      
    }
    
    &__form {
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    
    &__input {
      padding: 10px;
      border-radius: 10px;
    }
    */
  }
</style>