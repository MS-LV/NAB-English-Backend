const configsModel = require('../models/configs');
const ApiError = require('../middlewares/error-middlewares');

class Configs {
    async getConfigs(req, res, next) {
        try {
            const configs = await configsModel.findOne({});
            res.json(configs);
        } catch (e) {
            next(ApiError.BadRequestError('Can`t take server configs!'));
        }
    }
    async updateConfig(req, res, next) {
        try {
            const body = req.body;
            const configs = await configsModel.findOneAndUpdate({}, body, {new: true});
            res.json(configs);
        }catch (e) {
            next(ApiError.BadRequestError('Can`t update configs!'));
        }
    }
}

module.exports = new Configs();