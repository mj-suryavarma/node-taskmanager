const express = require('express');
const router = express.Router();
const app = express();
 
app.use(express.urlencoded({extended: false}))
app.use(express.json())


 
const {getAllTasks,
       createTasks,
       updateTasks,
       getTasks,
      deleteTasks,
      editTask} = require('../controllers/task');


router.route('/').get(getAllTasks).post(createTasks);
router.route('/:id').get(getTasks).patch(updateTasks).delete(deleteTasks).put(editTask); 


// app.get('/',getAllTasks);
// app.post('/',createTasks);
// app.get('/:id',getTasks);
// app.patch('/:id',updateTasks);
// app.delete('/:id',deleteTasks);



module.exports = router;