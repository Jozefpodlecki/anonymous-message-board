<template>
  <div v-if="!loading" class="thread">
    <div class="thread__content">
      <create-reply-modal :isopen="createReplyModalOpened" @closemodal="createReplyModalOpened = false" @createreply="createReply">
      </create-reply-modal>
      <report-reply-modal :isopen="reportReplyModalOpened" @closemodal="reply_id = null; reportReplyModalOpened = false" @reportreply="reportReply">
      </report-reply-modal>
      <delete-reply-modal :isopen="deleteReplyModalOpened" @closemodal="reply_id = null; deleteReplyModalOpened = false" @deletereply="deleteReply">
      </delete-reply-modal>
      <div class="thread__panel">
        <router-link class="thread__back" to="/">
          Back
        </router-link>
        <button class="thread__new-reply" @click="createReplyModalOpened = true">
            New Reply
        </button>  
      </div>
      <div class="thread__container">
        <div class="thread__section">
            <div class="thread__header">
              <span>{{ip_Address}}</span>
              <time :datetime="created_on">{{formatDate(created_on, currentDate)}}</time>
            </div>
            <div class="thread__text">
              <span>{{text}}</span>  
            </div>
          </div>
       <div class="thread__actions">
          <div class="thread__action">
            <font-awesome-icon :icon="['fas', 'flag']" size="2x" @click="reportThread" />  
          </div>
          <div class="thread__action">
            <font-awesome-icon :icon="['fas', 'trash']" size="2x" @click="deleteThread" />
          </div>
        </div>
      </div>
      <div>
        <div v-bind:key="reply.id" v-for="reply in replies">
          <reply 
                 :ip_address="reply.ip_Address"
                 :created_on="reply.created_on"
                 :created_on_formatted="formatDate(reply.created_on, currentDate)"
                 :text="reply.text"
                 @reportreply="reply_id = reply.id; reportReplyModalOpened = true"
                 @deletereply="reply_id = reply.id; deleteReplyModalOpened = true">
          </reply>
        </div>  
      </div>
      <pagination :currentpage="page" :numberofpages="pages">
      </pagination>
    </div>
    <div class="thread__replyForm">
      <create-reply-form @createreply="createReply">
      </create-reply-form>  
    </div>
  </div>
  <loading v-else />
</template>

<script>
  import Loading from './Loading.vue'
  import CreateReplyForm from './CreateReplyForm.vue'
  import CreateReplyModal from './modals/CreateReplyModal.vue'
  import ReportReplyModal from './modals/ReportReplyModal.vue'
  import DeleteReplyModal from './modals/DeleteReplyModal.vue'
  import Pagination from './Pagination.vue'
  import Reply from './Reply.vue'
  import * as moment from 'moment';
  import { formatDate } from './utils'
  import { 
    addThread,
    getThread,
    getThreads,
    reportThread,
    deleteThread,
    addReply,
    getReplies,
    reportReply,
    deleteReply
   } from './api'
  
  export default {
    name: 'thread',
    components: {
      Loading,
      Pagination,
      CreateReplyModal,
      CreateReplyForm,
      ReportReplyModal,
      DeleteReplyModal,
      Reply
    },
    data() {
      return {
        loading: true,
        board: null,
        currentDate: null,
        thread_id: null,
        reply_id: null,
        ip_Address: null,
        created_on: null,
        text: null,
        replies: [],
        page: 0,
        pages: 0,
        createReplyModalOpened: false,
        reportReplyModalOpened: false,
        deleteReplyModalOpened: false
      }
    },
    methods: {
      formatDate: formatDate,
      createReply(data) {
        data = {
          ...data,
          thread_id: this.thread_id,
          board: this.board
        }
        
        this.loading = true;
        this.createReplyModalOpened = false;
        
        addReply(data)
          .then(({result}) => {
          
            getReplies({
              board: this.board,
              thread_id: this.thread_id
            }).then(({data: replies}) => {
              this.replies = replies;
              this.loading = false;
            })
          })
          .catch(error => {
          
          getReplies({
              board: this.board,
              thread_id: this.thread_id
            }).then(({data: replies}) => {
              this.replies = replies;
              this.loading = false;
            })
        })
      },
      reportReply(data) {
        data = {
          ...data,
          reply_id: this.reply_id,
          board: this.board
        }
        
        this.loading = true;
        this.reportReplyModalOpened = false;
        
        reportReply(data)
          .then(({data}) => {
            this.loading = false;
          })
      },
      reportThread(data) {
        data = {
          ...data,
          thread_id: this.thread_id,
          board: this.board
        }
        
        reportThread(data)
          .then(({data}) => {
            console.log(data)
          })
      },
      deleteReply(data) {
        data = {
          ...data,
          reply_id: this.reply_id,
          board: this.board
        }
        
        this.loading = true;
        this.deleteReplyModalOpened = false;
        
        deleteReply(data)
        .then(({data}) => {
          console.log(data)
          
          getReplies({
            board: this.board,
            thread_id: this.thread_id
          }).then(({data: replies}) => {
            this.replies = replies;
            this.loading = false;
          })
        })
      },
      deleteThread(data) {
        data = {
          ...data,
          thread_id: this.thread_id,
          board: this.board
        }
        
        deleteThread(data)
        .then(({data}) => {
          console.log(data)
          const path = `/${this.board}`;
          this.$router.push({ path })
        })
      }
    },
    mounted() {
      const params = this.$route.params
      this.board = params.board;
      this.currentDate = moment();
      this.thread_id = params.thread_id;
      
      getThread({
        board: this.board,
        thread_id: this.thread_id
      }).then(({data}) => {
        const { text, created_on, bumped_on, ip_Address } = data;
        this.text = text;
        this.created_on = created_on;
        this.bumped_on = bumped_on;
        this.ip_Address = ip_Address;
        
        getReplies({
          board: this.board,
          thread_id: this.thread_id
        }).then(({data: replies}) => {
          this.replies = replies;
          this.loading = false;
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  
  .thread {
    display: flex;
    flex-direction: column;
    height: 100%;
    
    &__content {
      flex: 1 1 auto;
    }
    
    &__replyForm {
      flex: 0 0 auto;
      margin-bottom: 10px;
      align-self: center;
    }
    
    &__panel {
      padding: 10px;
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
      display: flex;
      padding: 10px;
      box-shadow: 0 0 1px 0 black;
      margin: 0 10px 10px 10px;
    }
    
    &__text {
      font-size: 20px;
    }
    
    &__section {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }
    
    &__action {
      margin: 5px 0;
      cursor: pointer;
    }
    
    &__actions {
      flex: 0 0 auto;
    }
    
    &__back, &__new-reply {
      padding: 10px;
      text-decoration: none;
      border: 1px solid black;
      border-radius: 10px;
      font-size: 15px;
      margin: 0px 5px;
      background: white;
      cursor: pointer;
    }
  }
  
</style>