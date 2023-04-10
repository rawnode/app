const { createReadStream, existsSync, mkdirSync, writeFileSync } = require('fs');

exports.publicSettings = (path = 'public', file = 'favicon.ico') => {
  if (!existsSync(process.cwd() + `/${path}`)) {
    mkdirSync(process.cwd() + `/${path}`, { recursive: true });
    console.log('public directory created successfully!');
    if (!existsSync(process.cwd() + `${path}/${file}`)) {
      writeFileSync(process.cwd() + `${path}/${file}`, 'This is a new file!');
      console.log('favicon.ico file created successfully in public directory!');
    }
  } else {
    if (!existsSync(process.cwd() + `${path}/${file}`)) {
      writeFileSync(process.cwd() + `${path}/${file}`, 'This is a new file!');
      console.log('favicon.ico file created successfully in public directory!');
    }
  }
}
exports.routesSetting = (path = 'routes') => {
  if (!existsSync(process.cwd() + `/${path}`)) {
    mkdirSync(process.cwd() + `/${path}`, { recursive: true });
  }
}
