<template>
  <div class="reply-form">
    <div class="reply-form__header">
      <span>New Reply</span>
    </div>
    <form @submit="submit">
      <div class="reply-form__field reply-form__textarea">
        <textarea required v-model="text" placeholder="describe...">
        </textarea>  
      </div>
      <div class="reply-form__field reply-form__deletePassword">
        <label for="delete_password">Delete Password</label>
        <input required name="delete_password" v-model="delete_password" type="text"/>
      </div>
      <div class="reply-form__field">
        <input class="reply-form__submit" type="submit" value="Create"/>
      </div>
    </form> 
  </div>
</template>

<script>
  export default {
    name: 'createreplyform',
    props: {
    },
    data() {
      return {
        text: null,
        delete_password: null
      }
    },
    methods: {
      submit(event) {
        event.preventDefault();        
        const data = {
          text: this.text,
          delete_password: this.delete_password
        }
        
        this.delete_password = null;
        this.text = null;
        
        this.$emit('createreply', data)
      }
    }
   }
</script>

<style lang="scss" scoped>
  .reply-form {
    padding: 10px;
    width: 400px;
    box-shadow: 0 0 1px 0 black;
    border-radius: 10px;
    font-size: 15px;
    
    &__field {
      margin: 10px 0;
    }
    
    &__textarea {
      display: flex;
      
      textarea {
        flex: 1 1 auto;
        border-radius: 5px;
        padding: 10px;
      }
    }
    
    &__deletePassword {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      label {
        flex: 0 0 auto;
        margin-right: 20px; 
      }
      
      input {
        flex: 1 1 auto;
        border-radius: 5px;
        padding: 5px;  
      }
      
    }
    
    &__submit {
      padding: 10px;
      border-radius: 10px;
      border: 1px solid black;
      background: white;
    }
  }
</style>