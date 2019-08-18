module.exports = {
  runtimeCompiler: true,
  publicPath: '/',  // 设置打包文件相对路径
  devServer: {
    // host: 'localhost', 
    port: 8071,
    // open: true,  // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}