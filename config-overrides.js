const path = require('path')
const { override, addWebpackAlias } = require('customize-cra')

module.exports = override(
    addWebpackAlias({
        '@src': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@scss': path.resolve(__dirname, 'src/scss'),
    })
)