

<template tag="div" class="tab">
  <transition-group>
    <!-- <el-tag v-for="(item, index) in keepAlive" :key="item.name || item.path"
      :data-index="index" draggable="true" cursor="pointer" :type="$route.matched.find(route => route.name == item.name) ? '' : 'info'" :closable="keepAlive.length > 1"
      :effect="item.name == $route.name ? 'dark' : 'plain'" @dragstart="dragstart"
      @drop="drop($event, index)"
      @dragover.prevent=""
      @click="$router.push(item)"
      @close="keepAlive.splice(index, 1), (item.name == $route.name) && $router.push([...keepAlive].reverse()[0])">
      {{ item.meta?.title || item.name }}
    </el-tag> -->
  </transition-group>
</template>

