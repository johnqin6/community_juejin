module.exports = {
  runtimeCompiler: true,
  publicPath: '/',  // 设置打包文件相对路径
  devServer: {
    // host: 'localhost', 
    // port: 3000,
    // open: true,  // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}