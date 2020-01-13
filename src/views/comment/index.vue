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
  name: 'comment',
  data () {
    return {
      commentForm: {
        type: 'a',
        source: [],
        allow_comment: true
      },
      commentList: []
    }
  },
  created () {
    this.getcommentList()
  },
  methods: {
    getcommentList () {
      let pro = this.$http({
        url: '/mp/v1_0/comments',
        method: 'get',
        params: this.commentForm
      })
      pro
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          this.$message.error('获取评论列表错误' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
