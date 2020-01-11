<template>
  <div>
    <el-table :data="commentList" style="width: 100%">
      <el-table-column prop="date" label="标题" width="300"></el-table-column>
      <el-table-column prop="name" label="评论状态" width="180"></el-table-column>
      <el-table-column prop="address" label="总评论数"></el-table-column>
      <el-table-column prop="address" label="粉丝评论数"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: {

      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
