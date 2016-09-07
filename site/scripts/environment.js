import env from '../../env.json';

var site_env = process.env.NODE_ENV || env.site_env || "dev";

console.log("env: " + site_env);

export default site_env;
