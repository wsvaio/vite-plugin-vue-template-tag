# vite-plugin-vue-template-tag
支持.vue文件<template>根标签添加tag等属性，解析成新的子元素并包裹旧的子元素

# EXAMPLE
1. install
```
npm install -D vite-plugin-vue-template-tag
```
2. config
```typescript
// vite.config.ts
...
import templateTag from "vite-plugin-vue-template-tag";
...
  plugins: [
    vue(),
    templateTag()
  ],
...
```
3. IN
```vue
<template tag="div" class="root" lang="html" @click="(ev) => {ev.preventDefault(); }" hide :isHidden="false">
  <h1>Hello World !</h1>

</template>
```

4. OUT
```vue
<template>
<div class="root" @click="(ev) => { ev.preventDefault(); }" :isHidden="false" hide><!-- generate by vite-plugin-vue-template-tag -->
  <h1>Hello World !</h1>

</div>
</template>
```