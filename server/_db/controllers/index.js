const fs = require("fs");
const path = require("path");

(function parseControllers(dir, depth) {
	fs.readdirSync(dir)
		.filter(fileName => fileName !== "index.js" && fileName !== 'ControllerTemplate.js')
		.forEach(fileName => {
			if (fs.lstatSync(path.join(dir, fileName)).isDirectory()) {
				if (depth < 3)
					parseControllers(path.join(dir, fileName), depth + 1);
			} else {
                require("" + path.join(dir, fileName));
			}
		});
})(path.resolve(__dirname), 0);
