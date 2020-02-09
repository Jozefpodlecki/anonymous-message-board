import Boards from './Boards.vue'
import Thread from './Thread.vue'
import Threads from './Threads.vue'

export default [
  { 
    path: '/',
    component: Boards
  },
  { 
    path: '/:board',
    component: Threads
  },
  { 
    path: '/:board/:thread_id',
    component: Thread
  },
  { 
    path: '/b/:board/:thread_id',
    component: Thread
  },
]