<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>图片管理</span>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
</style>
