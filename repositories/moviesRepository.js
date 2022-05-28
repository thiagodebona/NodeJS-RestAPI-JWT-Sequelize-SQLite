const resultService = require('../utils/defaultResultService');
const inoe = require("isnullorempty");
const { pushNewAuditChange } = require('../repositories/auditRepository');
const { insertValidation, updateValidation } = require('../validations/movieValidation');
const Movies = require("../models").Movies;

const getAllMovies = async (req, res) => {
    const movies = await Movies.findAndCountAll();
    const data = {
        context: movies.rows,
        total: movies.count
    };

    resultService.createSuccessResult(res, data);
};

const getMovieById = async (req, res) => {
    const id = req.params.id;
    await Movies.findOne({ where: { id: id } }).then((item) => {
        if (item != null) {
            resultService.createSuccessResult(res, item, null)
        } else {
            resultService.createNotFoundResult(res, req.params, `Impossible to find movie by id ${id}`);
        }
    });
};

const insertMovie = async (req, res) => {
    const { error } = await insertValidation(req.body);
    if (error)
        return resultService.createErrorResult(res, null, error.details[0].message, error);

    const movie = {
        title: req.body.title,
        originalTitle: req.body.originalTitle,
        description: req.body.description,
        releaseYear: req.body.releaseYear,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await Movies.create(movie).then((item) => {
        pushNewAuditChange("Movie", "Insert", item.id, req.user.id, function () {
            resultService.createSuccessResult(res, item, "Movie successfully inserted");
        });
    });
};

const updateMovie = async (req, res) => {
    const id = req.params.id;
    const { error } = updateValidation(req.body);
    if (error) {
        return resultService.createNotFoundResult(res, null, error.details[0].message, error);
    }

    await Movies.findByPk(id).then((item) => {
        if (item != null) {
            const itemToUpdate = {
                updatedAt: new Date(),
                createdAt: item.createdAt
            };

            if (!inoe.isNullOrUndefined(req.body.title))
                itemToUpdate.title = req.body.title;

            if (!inoe.isNullOrUndefined(req.body.originalTitle))
                itemToUpdate.originalTitle = req.body.originalTitle;

            if (!inoe.isNullOrUndefined(req.body.description))
                itemToUpdate.description = req.body.description;

            if (!inoe.isNullOrUndefined(req.body.releaseYear))
                itemToUpdate.releaseYear = req.body.releaseYear;

            if (inoe.isNullOrUndefined(req.body.title) &&
                inoe.isNullOrUndefined(req.body.originalTitle) &&
                inoe.isNullOrUndefined(req.body.description) &&
                inoe.isNullOrUndefined(req.body.releaseYear))
                resultService.createErrorResult(res, null, "Nothing to be updated");


            item.update(itemToUpdate).then((response) => {
                pushNewAuditChange("Movie", "Update", id, req.user.id, function () {
                    resultService.createSuccessResult(res, response, "Movies successfully updated");
                });
            });
        } else {
            resultService.createNotFoundResult(res, req.params, `Impossible to find movie by id ${id}`);
        }
    });
};

const deleteMovie = async (req, res) => {
    const id = req.params.id;
    await Movies.findByPk(id).then((item) => {
        if (item != null) {
            item.destroy();
            pushNewAuditChange("Movie", "Delete", id, req.user.id, function () {
                res.sendStatus(200);
            });
        } else {
            resultService.createNotFoundResult(res, req.params, `Impossible to find movie by id ${id}`);
        }
    });
};

module.exports = {
    getAllMovies,
    getMovieById,
    insertMovie,
    updateMovie,
    deleteMovie
};