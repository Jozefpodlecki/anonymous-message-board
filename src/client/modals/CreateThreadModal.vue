<template>
  <div v-if="isopen" class="create-thread-modal">
    <div class="create-thread-modal__container">
      <div class="create-thread-modal__header">
        <p class="create-thread-modal__title">
          Create new thread in {{board}} board...  
        </p>
        <div class="create-thread-modal__closeIcon">
          <font-awesome-icon :icon="['fas', 'times']" size="2x" @click="$emit('closemodal')" />
        </div>
      </div>
      <form @submit="submit" class="create-thread-modal__form">
        <div class="create-thread-modal__field">
          <textarea class="create-thread-modal__textarea" required v-model="text" placeholder="describe...">
          </textarea>          
        </div>
        <div class="create-thread-modal__labelField">
          <label class="create-thread-modal__label" for="delete_password">Delete Password</label>
          <input class="create-thread-modal__labelInput" required name="delete_password" v-model="delete_password" type="text" placeholder = "enter password..."/>  
        </div>
        <div class="create-thread-modal__field">
          <input class="create-thread-modal__submit" type="submit" value="Create"/>
        </div>
      </form>  
    </div>
  </div>
</template>

<script>
  export default {
    name: 'createthreadmodal',
    props: {
      isopen: {
        type: Boolean,
        required: true
      },
      board: {
        type: String
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
        this.$emit('createthread', {
          text: this.text,
          delete_password: this.delete_password
        })
        
        event.preventDefault();
      }
    }
   }
</script>

<style lang="scss">
  @import '../mixings.scss';
  
  .create-thread-modal {
    @include modal;
    
  }
</style>