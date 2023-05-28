module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            email: { type: String, unique: true },
            password: { type: String },
            tasks: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "task"

            }],
            token: { type: String }


        }, {
        timestaps: true
    }
    )

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;

        return object;
    });
    return mongoose.model("user", schema);
}