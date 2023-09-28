class Testing {
    async formatSaveData(body, userDto) {
        const {correct, incorrect, group, block} = body;
        const saveData = {
            correct,
            incorrect,
            group,
            block,
            user: userDto.id
        }
        return saveData;
    }
}