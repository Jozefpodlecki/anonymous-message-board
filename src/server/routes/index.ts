import homeController from './../controllers/home'
import boardController from './../controllers/board'
import threadController from './../controllers/thread'
import replyController from './../controllers/reply'

export default (app: any) => {
  app.get("/api/boards/initialize", boardController.initialize);
  app.get("/api/boards", boardController.getBoards);
  app.get("/api/threads/:board", threadController.getThreads);
  app.get("/api/threads/:board/:thread_id", threadController.getThread);
  app.post("/api/threads/:board", threadController.createThread);
  app.put("/api/threads/:board", threadController.reportThread);
  app.delete("/api/threads/:board", threadController.deleteThread);
  app.get("/api/replies/:board", replyController.getReplies);
  app.post("/api/replies/:board", replyController.createReply);
  app.put("/api/replies/:board", replyController.reportReply);
  app.delete("/api/replies/:board", replyController.deleteReply);
  app.get('/', homeController.get);
}