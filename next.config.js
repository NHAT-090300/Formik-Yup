/** @type {import('next').NextConfig} */
const withImages = require('next-images');
const path = require('path');
module.exports = withImages();
module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	reactStrictMode: true,
	env: {
		BASE_URL: process.env.BASE_URL,
	},
};
