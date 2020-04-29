const path = require("path")

module.exports = {
    entry:path.resolve(__dirname,"app"),
    output:{
        path:path.resolve(__dirname,"build"),
        filename:"build.js"
    },
    devServer:{
        port:3000,
        contentBase:path.resolve(__dirname,"build")
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_moddules/,
                use:["babel-loader"]
            }
        ]
    }
}