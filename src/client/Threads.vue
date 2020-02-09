<template>
  <div v-if="!loading" class="threads">
    <div class="threads__header">
      <button class="threads__create" @click="createThreadModalOpened = true">
        New Thread  
      </button>
      <create-thread-modal :board="board" :isopen="createThreadModalOpened" @closemodal="createThreadModalOpened = false" @createthread="createThread">
      </create-thread-modal>
      <report-thread-modal :isopen="reportThreadModalOpened" @closemodal="thread_id = null; reportThreadModalOpened = false" @reportthread="reportThread">
      </report-thread-modal>
      <delete-thread-modal :isopen="deleteThreadModalOpened" @closemodal="thread_id = null; deleteThreadModalOpened = false" @deletethread="deleteThread">
      </delete-thread-modal>
    </div>
    <div class="threads__list">
      <div class="thread" :key="thread.id" v-for="thread in threads">
        <div @click="goToThread(thread.id)" class="thread__section">
          <div class="thread__header">
            <span>{{thread.ip_Address}}</span>
            <time :datetime="thread.created_on">{{formatDate(thread.created_on, currentDate)}}</time>
          </div>
          <div class="thread__container">
            <span>{{thread.text}}</span>  
          </div>
          <div v-if="thread.replies.length" class="thread__replies">
            <div class="reply" v-for="reply in thread.replies">
              <div class="reply__header">
                <span>{{reply.ip_Address}}</span>  
                <span>{{formatDate(reply.created_on, currentDate)}}</span>
              </div>
              <div class="reply__content">
                <span>{{thread.text}}</span>  
              </div>
            </div>  
          </div>
        </div>
        <div class="thread__actions">
          <div class="thread__action">
            <font-awesome-icon :icon="['fas', 'flag']" size="2x" @click="thread_id = thread.id; reportThreadModalOpened = true" />
          </div>
          <div class="thread__action">
            <font-awesome-icon :icon="['fas', 'trash']" size="2x" @click="thread_id = thread.id; deleteThreadModalOpened = true" />
          </div>
        </div>
      </div>
    </div>
    <pagination classname="threads__pagination" @pagechange="pageChange" :currentpage="page" :numberofpages="pages">
    </pagination>
  </div>
  <loading v-else />
</template>

<script>
  import Loading from './Loading.vue'
  import CreateThreadModal from './modals/CreateThreadModal.vue'
  import ReportThreadModal from './modals/ReportThreadModal.vue'
  import DeleteThreadModal from './modals/DeleteThreadModal.vue'
  import Pagination from './Pagination.vue'
  import { formatDate } from './utils'
  import {
    addThread,
    getThreads,
    reportThread,
    deleteThread
  } from './api'
  import * as moment from 'moment';
  
  export default {
    name: 'threads',
    components: {
      Loading,
      Pagination,
      CreateThreadModal,
      ReportThreadModal,
      DeleteThreadModal
    },
    data() {
      return {
        loading: true,
        board: null,
        currentDate: null,
        thread_id: null,
        threads: [],
        pages: 0,
        page: 0,
        pageSize: 10,
        createThreadModalOpened: false,
        reportThreadModalOpened: false,
        deleteThreadModalOpened: false
      }
    },
    props: {
      
    },
    methods: {
      formatDate: formatDate,
      pageChange(newPage) {
        this.page = newPage;
        
        getThreads({
          board: this.board,
          page: this.page
        }).then(({ data: threads }) => {
          this.threads = threads;
          this.loading = false;
        });  
      },
      goToThread(thread_id) {
        
        
        this.$router.push({ path: `/${this.board}/${thread_id}`});
        //, params: { board: this.board, thread_id }
      },
      createThread(data) {
        data = {
          ...data,
          board: this.board
        };
        
        this.createThreadModalOpened = false;
        this.loading = true;
        
        addThread(data).then(result => {
          getThreads({
            board: this.board,
            page: this.page
          }).then(({ data: threads }) => {
              this.threads = threads;
              this.loading = false;
            });
          
        })
        .catch(error => {
          getThreads({
            board: this.board,
            page: this.page
          }).then(({ data: threads }) => {
              this.threads = threads;
              this.loading = false;
            });
        });
      },
      reportThread(data) {
        data = {
          ...data,
          thread_id: this.thread_id,
          board: this.board
        }
        
        this.reportThreadModalOpened = false
        
        reportThread(data).then(result => {
          
        });
      },
      deleteThread(data) {
        data = {
          ...data,
          thread_id: this.thread_id,
          board: this.board
        }
        
        this.deleteThreadModalOpened = false;
        this.loading = true;
        
        deleteThread(data).then(result => {
          getThreads({
          board: this.board,
          page: this.page
        }).then(({ data: threads }) => {
            this.threads = threads;
            this.loading = false;
          });    
        });
      }
    },
    mounted() {
      
      this.board = this.$route.params.board;
      this.currentDate = moment();
      
      getThreads({
          board: this.board,
          page: this.page
        }).then(({ data: threads }) => {
        this.threads = threads;
        this.loading = false;
      });
    }
  }
</script>

<style lang="scss" scoped>
  .thread {
    padding: 10px;
    border: 1px solid black;
    margin: 10px;
    display: flex;
    
    &__section {
      flex: 1 1 auto;
      cursor: pointer;
    }
    
    &__header {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      padding: 10px;
      color: gray;
      font-weight: bold;
    }
    
    &__container {
      font-size: 20px;
      margin: 20px 0;
    }
    
    &__replies {
      margin: 10px 10px 0 10px;
    }
    
    &__action {
      margin: 10px 0;
      cursor: pointer;
    }
    
    &__actions {
      flex: 0 0 auto;
      padding: 10px;
    }
  }
  
  .reply {
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: 0 0 1px 0 black;
    margin-top: 10px;
    
    &__header {
      display: flex;
      justify-content: space-between;
    }
    
    &__content {
      margin-top: 2px;
      font-size: 15px;
    }
  }
  
  .threads {
    display: flex;
    flex-direction: column;
    
    &__create {
      padding: 10px;
      border: 1px solid black;
      background: white;
      cursor: pointer;
      border-radius: 10px;
      transition: background 0.3s ease-in;
      
      &:hover {
        background: darken(white, 20);
      }
    }
    
    &__header {
      flex: 0 0 auto;
      padding: 10px;
    }
    
    &__list {
      flex: 1 1 auto;
    }
    
    &__pagination {
      flex: 0 0 auto;
    }
  }
  
  
</style>