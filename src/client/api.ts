import axios from 'axios'

const url = 'https://jozef-anonymous-message-board.glitch.me'

const reasons = [
  'Sexual content',
  'Violent or repulsive content',
  'Hateful or abusive content',
  'Harmful dangerous acts',
  'Child abuse',
  'Promotes terrorism',
  'Spam or misleading',
  'Infringes my rights',
  'Captions issue'
  ].map((text, index) => ({id: index + 1, text}))

export const getReportReasons = () => Promise.resolve(reasons);

export const getBoards = () => axios
  .get(`${url}/api/boards`)
  .then(response => response);

export const addThread = (data) => axios
  .post(`${url}/api/threads/${data.board}`, data)
  .then(response => response)
  .catch(error => {
    console.log("error", error);
  });

export const getThread = (data) => axios
  .get(`${url}/api/threads/${data.board}/${data.thread_id}`)
  .then(response => response)
  .catch(error => {
    console.log("error", error);
  });

export const getThreads = (data) => {
  let query = `${url}/api/threads/${data.board}`;  
  
  if(data.page) {
    query += `?page={data.page}`
  }
  
  if(data.pageSize) {
    query += `&pageSize=${data.pageSize}`
  }
  
  return axios
    .get(query)
    .then(response => response)
    .catch(error => {
      console.log("error", error);
    }); 
}

export const reportThread = (data) => axios
  .put(`${url}/api/threads/${data.board}`, data)
  .then(response => response)
  .catch(error => {
    console.log("error", error);
  });

export const deleteThread = (data) => axios
  .delete(`${url}/api/threads/${data.board}`, { data })
  .then(response => response)
  .catch(error => {
    console.log("error", error);
  });

export const addReply = (data) => axios
  .post(`${url}/api/replies/${data.board}`, data)
  .then(response => response)
  .catch(error => {
    console.log("error", error);
  });

export const getReplies = (data) => {
  let query = `${url}/api/replies/${data.board}?thread_id=${data.thread_id}`;
  
  if(data.page) {
    query += `&page={data.page}`
  }
  
  if(data.pageSize) {
    query += `&pageSize=${data.pageSize}`
  }
  
  return axios
    .get(query)
    .then(response => response)
    .catch(error => {
      console.log("error", error);
    });
}

export const reportReply = (data) => axios
  .put(`${url}/api/replies/${data.board}`, data)
  .then(response => response)
  .catch(error => {
    console.log("error", error);
  });

export const deleteReply = (data) => axios
  .delete(`${url}/api/replies/${data.board}`, { data })
  .then(response => response)
  .catch(error => {
    console.log("error", error);
  });