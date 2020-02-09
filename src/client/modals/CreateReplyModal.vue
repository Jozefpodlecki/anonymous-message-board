<template>
  <div v-if="isopen" class="create-reply-modal">
    <div class="create-reply-modal__container">
      <div class="delete-reply-modal__header">
        <p class="delete-reply-modal__title">
          Create new reply in thread...  
        </p>
        <div class="delete-reply-modal__closeIcon">
          <font-awesome-icon :icon="['fas', 'times']" size="2x" @click="$emit('closemodal')" />
        </div>
      </div>
      <form @submit="submit" class="create-reply-modal__form">
        <div class="reply-form__field reply-form__textarea">
          <textarea class="create-thread-modal__textarea" required v-model="text" placeholder="describe...">
          </textarea>
        </div>
        <div class="create-reply-modal__field">
          <label class="create-reply-modal__label" for="delete_password">Delete Password</label>
          <input class="create-reply-modal__labelInput" required v-model="delete_password" type="text"/>
        </div>
        <div class="create-reply-modal__field">
          <input class="create-reply-modal__submit" type="submit" value="Create"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'createreplymodal',
    props: {
      isopen: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        text: null,
        delete_password: null
      }
    },
    methods: {
      submit(event) {
        this.$emit('createreply', {
          text: this.text,
          delete_password: this.delete_password
        })
        
        event.preventDefault();
      }
    }
   }
</script>

<style lang="scss" scoped>
  @import '../mixings.scss';
  
  .create-reply-modal {
    @include modal;
    
    /*
    &__container {
      width: 400px;
      height: 300px;
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
    
    &__textarea {
      border-radius: 20px;
      width: 100%;
      padding: 10px;
    }
    
    &__form {
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    */
  }
</style>