const { date } = require("@hapi/joi/lib/template");
const { request } = require("express");
const inoe = require("isnullorempty");
const { pushNewAuditChange } = require('../repositories/auditRepository');
const { insertValidation, updateValidation } = require('../validations/movieValidation');
// represents the jpa layer to fetch data from db
const Movies = require("../models").Movies;

const getAllMovies = async (req, res) => {
    const movies = await Movies.findAndCountAll();
    res.send({
        context: movies.rows,
        total: movies.count
    });
};

const getMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        await Movies.findOne({ where: { id: id } }).then((item) => {
            if (item != null) {
                res.send(item);
            } else {
                res.sendStatus(404);
            }
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error });
    }
};

const insertMovie = async (req, res) => {
    try {
        const { error } = await insertValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const movie = {
            title: req.body.title,
            originalTitle: req.body.originalTitle,
            description: req.body.description,
            releaseYear: req.body.releaseYear,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await Movies.create(movie).then((item) => {
            pushNewAuditChange("Movie", "Insert", item.id, req.user.id, function (response) {
                res.sendStatus(200);
            });
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error });
    }
};

const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const { error } = updateValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
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


                item.update(itemToUpdate).then(() => {
                    pushNewAuditChange("Movie", "Update", id, req.user.id, function () {
                        res.sendStatus(200);
                    });
                });
            } else {
                res.sendStatus(404);
            }
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        await Movies.findByPk(id).then((item) => {
            if (item != null) {
                item.destroy();
                pushNewAuditChange("Movie", "Delete", id, req.user.id, function () {
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(404);
            }
        });
    } catch (error) {
        res.status(500).send({ success: false, error: error });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    insertMovie,
    updateMovie,
    deleteMovie
};