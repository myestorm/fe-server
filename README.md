# fe-server

前端基础开发仓库，包含线上node服务；基础包含vue2，vue-cli3，多页应用；以及基本的proxy服务。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 如何新建一个页面？

```
# 创建一个user页面
cd src/pages
mkdir user
cd user
touch user.json
touch user.js
touch user.vue
```

### user.json

```
{
  "entry": "入口文件",    // 非必填，不填则与json文件一致的js，如：user.js
  "pageName": "页面名称", // 非必填，不填则为json文件名
  "title": "页面标题",    // 非必填，不填则为空
  "template": "模板"      // 非必填，不填则"public/index.html"
}
```

### user.js
```
import Vue from 'vue'
import App from './user.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')

```

### user.vue
```
<template>
  <h1>This is user page</h1>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">

</style>
```

> 如何改回单页面？1.将vue.config.spa.js 改成 vue.config.js; 2.删除src/pages目录; 3.public/index_spa.html 改成 index.html

## 如何建立一个代理？
```
cd proxys
touch api.js
```

### api.js
```js
module.exports = {
  target: 'https://www.estorm.cn/',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/api': '/'
  }
}
```

> 表示：
> http://localhost:8080/api => https://www.estorm.cn/
> http://localhost:3000/api => https://www.estorm.cn/
