let shell = require("shelljs");
let run = (cmd) => {
    shell.exec(cmd, {
        env: {...process.env, FORCE_COLOR: true},
    });
};

let browser = process.argv.slice(2)[0];

run(`cp -r build/icons ${browser}/`);
run(`wp-scripts build --webpack-src-dir=src/background --output-path=${browser}/background`);
run(`wp-scripts build --webpack-src-dir=src/content --output-path=${browser}/content`);
run(`cp -r src/sidebar ${browser}/`);
run(`wp-scripts build --webpack-src-dir=src/wp-plugin --output-path=${browser}/wp-plugin`);
