import { Router } from 'express';
import { CreateSubjectController } from 'modules/subjects/controllers/CreateSubjectController';
import { DeleteSubjectController } from 'modules/subjects/controllers/DeleteSubjectController';
import { GetSubjectByQuarterIdController } from 'modules/subjects/controllers/GetSubjectByQuarterIdController';
import { GetSubjectByUserIdController } from 'modules/subjects/controllers/GetSubjectByUserIdController';
import { UpdateSubjectController } from 'modules/subjects/controllers/UpdateSubjectController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const subjectsRoutes = Router();

const createSubjectController = new CreateSubjectController();
const deleteSubjectController = new DeleteSubjectController();
const updateSubjectController = new UpdateSubjectController();
const getSubjectByQuarterIdController = new GetSubjectByQuarterIdController();
const getSubjectByUserIdController = new GetSubjectByUserIdController();

subjectsRoutes.post('/', ensureAuthenticated, createSubjectController.handle);
subjectsRoutes.get('/get/quarter/:id', ensureAuthenticated, getSubjectByQuarterIdController.handle);
subjectsRoutes.get('/get/user', ensureAuthenticated, getSubjectByUserIdController.handle);
subjectsRoutes.delete('/delete/:id', ensureAuthenticated, deleteSubjectController.handle);
subjectsRoutes.put('/update/:id', ensureAuthenticated, updateSubjectController.handle);

export { subjectsRoutes };
