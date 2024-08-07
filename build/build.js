let shell = require("shelljs");
let run = (cmd) => {
    shell.exec(cmd, {
        env: {...process.env, FORCE_COLOR: true},
    });
};

let browser = process.argv.slice(2)[0];
let target = `dist/${browser}`;
run(`rm -rf ${target} && mkdir -p ${target}`);

run(`cp build/manifest-${browser}.json ${target}/manifest.json`);
run(`cp -r build/icons ${target}/`);

run(`wp-scripts build --webpack-src-dir=src/background --output-path=${target}/background`);
run(`wp-scripts build --webpack-src-dir=src/content --output-path=${target}/content`);
run(`cp -r src/sidebar ${target}/`);
run(`wp-scripts build --webpack-src-dir=src/wp-plugin --output-path=${target}/wp-plugin`);
