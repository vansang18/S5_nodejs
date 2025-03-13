var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/categories');
let { CreateErrorRes, CreateSuccessRes } = require('../utils/responseHandler');

/* Lấy danh sách category */
router.get('/', async function(req, res, next) {
    try {
        let categories = await categoryModel.find({ isDeleted: false });
        CreateSuccessRes(res, categories, 200);
    } catch (error) {
        next(error);
    }
});

/* Lấy thông tin category theo ID */
router.get('/:id', async function(req, res, next) {
    try {
        let category = await categoryModel.findOne({ _id: req.params.id, isDeleted: false });
        if (!category) return CreateErrorRes(res, "Category not found", 404);
        CreateSuccessRes(res, category, 200);
    } catch (error) {
        next(error);
    }
});

/* Tạo mới category */
router.post('/', async function(req, res, next) {
    try {
        let body = req.body;
        let newCategory = new categoryModel({
            name: body.name,
            description: body.description
        });
        await newCategory.save();
        CreateSuccessRes(res, newCategory, 201);
    } catch (error) {
        next(error);
    }
});

/* Cập nhật category */
router.put('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let body = req.body;
        let updatedData = {};

        if (body.name) updatedData.name = body.name;
        if (body.description) updatedData.description = body.description;

        let updatedCategory = await categoryModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedCategory) return CreateErrorRes(res, "Category not found", 404);
        
        CreateSuccessRes(res, updatedCategory, 200);
    } catch (error) {
        next(error);
    }
});

/* Xóa mềm category */
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let deletedCategory = await categoryModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!deletedCategory) return CreateErrorRes(res, "Category not found", 404);
        
        CreateSuccessRes(res, deletedCategory, 200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
