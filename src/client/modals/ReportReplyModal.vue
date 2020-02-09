<template>
  <div v-if="isopen" class="report-reply-modal">
    <div class="report-reply-modal__container">
      <div class="report-reply-modal__header">
        <div class="report-reply-modal__title">
          <span>Do you want to report this reply? Why?</span>  
        </div>
        <div class="report-reply-modal__closeIcon">
          <font-awesome-icon :icon="['fas', 'times']" size="2x" @click="$emit('closemodal')" />
        </div>
      </div>
      <form @submit="submit" class="report-reply-modal__form">
        <div class="report-reply-modal__field">
          <select class="report-reply-modal__select" v-model="reason">
            <option v-for="reason in reasons" v-bind:value="reason.id">
              {{ reason.text }}
            </option>
          </select>
        </div>
        <div class="report-reply-modal__field">
          <input class="report-reply-modal__submit" type="submit" value="Report"/>  
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { getReportReasons } from '../api'
  
  export default {
    name: 'reportreplymodal',
    props: {
      isopen: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        reason: null,
        reasons: []
      }
    },
    mounted() {
      getReportReasons().then(data => {
        this.reasons = data;
      });
    },
    methods: {
      submit(event) {
        this.$emit('reportreply', {
          reason: this.reason
        })
        
        event.preventDefault();
      }
    }
   }
</script>

<style lang="scss" scoped>
  @import '../mixings.scss';
  
  .report-reply-modal {
    
    @include modal {
      &__labelField {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    &__labelInput {
      border-radius: 10px;
      padding: 10px;
      flex: 1 1 auto;
      margin-left: 20px;
    }
    }
    
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
    
    &__textarea {
      border-radius: 20px;
      width: 100%;
      padding: 10px;
    }
    
    &__input {
      border-radius: 20px;
    }
    
    &__field {
      margin: 10px 0;
    }
    
    &__label {
      font-size: 15px;
    }
    
    &__labelField {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    &__labelInput {
      border-radius: 10px;
      padding: 10px;
      flex: 1 1 auto;
      margin-left: 20px;
    }
    */
  }
</style>