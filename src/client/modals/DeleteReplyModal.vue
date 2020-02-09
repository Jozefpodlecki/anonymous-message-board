<template>
  <div v-if="isopen" class="delete-reply-modal">
    <div class="delete-reply-modal__container">
      <div class="delete-reply-modal__header">
        <p class="delete-reply-modal__title">
          Delete reply
        </p>
        <div class="delete-reply-modal__closeIcon">
          <font-awesome-icon :icon="['fas', 'times']" size="2x" @click="$emit('closemodal')" />
        </div>
      </div>
      <form @submit="submit" class="delete-reply-modal__form">
        <div class="delete-reply-modal__field">
          <input class="delete-reply-modal__input" required v-model="delete_password" type="text" placeholder="Enter password"/>
        </div>
        <div class="delete-reply-modal__field">
          <input class="delete-reply-modal__submit" type="submit" value="Delete"/>
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
        this.$emit('deletereply', {
          delete_password: this.delete_password
        })
        
        event.preventDefault();
      }
    }
   }
</script>

<style lang="scss" scoped>
  @import '../mixings.scss';
  
  .delete-reply-modal {
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
      font-size: 15px;
      margin: 0;
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
    */
  }
</style>