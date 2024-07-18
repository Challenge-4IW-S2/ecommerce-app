import {CommentSchema} from "../schemas/CommentSchema.js";
import {CommentController} from "../controllers/CommentController.js";
import {validateBody} from "../middlewares/validateBody.js";


export default function (router) {

        router.post("/comment", validateBody(CommentSchema), CommentController.createComment); //seul les clients peuvent creer des commentaires pas les admin
        router.get("/comment/:id", CommentController.getComment);
        router.get("/comments", CommentController.getAllComments);
        router.delete("/comment/:id", CommentController.deleteComment); // est ce que le client peut supprimer son commentaire ? ou seulement l'admin ?

        return router;
}