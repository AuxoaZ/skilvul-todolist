const { Schema } = require("mongoose");


module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            task_name: String,
            description: String,
            status: String,
            deadline: Date,
            // user: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: "user"
            // }


        }, {
        timestaps: true
    }
    )

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;

        return object;
    });

    return mongoose.model("task", schema);
}