const uploadService = require('../services/upload');
const ApiError = require('../exceptions/Auth');

class Upload {
    async uploadAndSave(req, res, next) {
        try {
            const body = req.body;
            if (!body.length) {
                return next(ApiError.BadRequestError('You send empty file !'));
            }
            const uploading = await uploadService.uploadAndSave(body);
            res.json({message: `${uploading.join(', ')} files are saved !`, status: 'success'});
        } catch (e) {
            next(ApiError.BadRequestError(`We are can\`t save files !`));
        }
    }
}

module.exports = new Upload();