const mix = require('laravel-mix');
require('laravel-mix-purgecss');

mix.js('resources/js/app.js', 'public/js').vue({ version: 2 })
    .sass('resources/sass/app.scss', 'public/css/')
