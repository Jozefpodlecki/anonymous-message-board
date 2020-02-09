<template>
  <div v-if="isopen" class="report-thread-modal">
    <div class="report-thread-modal__container">
      <div class="report-thread-modal__header">
        <div class="report-thread-modal__title">
          <span>Do you want to report this thread? Why?</span>  
        </div>
        <div class="report-thread-modal__closeIcon">
          <font-awesome-icon :icon="['fas', 'times']" size="2x" @click="$emit('closemodal')" />
        </div>
      </div>
      <form @submit="submit" class="report-thread-modal__form">
        <div class="report-thread-modal__field">
          <select class="report-thread-modal__select" v-model="reason">
            <option v-for="reason in reasons" v-bind:value="reason.id">
              {{ reason.text }}
            </option>
          </select>
        </div>
        <div class="report-thread-modal__field">
          <input class="report-thread-modal__submit" type="submit" value="Report"/>  
        </div>
      </form>  
    </div>
  </div>
</template>

<script>
  import { getReportReasons } from '../api'
  
  export default {
    name: 'reportthreadmodal',
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
      getReportReasons().then(reasons => {
        this.reasons = reasons;
      })
    },
    methods: {
      submit(event) {
        this.$emit('reportthread', {
          reason: this.reason
        })
        
        event.preventDefault();
      }
    }
   }
</script>

<style lang="scss" scoped>
  @import '../mixings.scss';
  
  .report-thread-modal {
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
    
    &__field {
      margin: 10px 0;
    }
    
    
    */
  }
</style>