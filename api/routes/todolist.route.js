const express = require('express');
const router = express.Router();
const controller = require('../../api/controllers/todolist.controller')

router.get('/',controller.index);
router.get('/:id',controller.getById)
router.post('/',controller.create);
router.patch('/:id',controller.update);
router.delete('/:id',controller.delete);
module.exports = router;
