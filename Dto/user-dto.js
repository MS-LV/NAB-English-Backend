class UserDto {
    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.surename = model.surename;
        this.email = model.email;
        this.role = model.role;
    }
}

module.exports = UserDto;