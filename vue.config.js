const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	publicPath: './',
    chainWebpack: (config) => {
        config.resolve.alias
			.set('src', resolve('src'))
			.set('style', resolve('src/style'))
			.set('components', resolve('src/components'))
			.set('router', resolve('src/router'))
			.set('store', resolve('src/store'))
			.set('utils', resolve('src/utils'))
			.set('views', resolve('src/views'))
			.set('pages', resolve('src/pages'))
			.set('constants', resolve('src/constants'))
			.set('assets', resolve('src/assets'))
			.end()
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
    }
}