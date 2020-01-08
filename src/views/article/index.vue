<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <div class="text item">
        <el-form ref="articleFormRef" :model="articleForm">
          <el-form-item label="文章状态">
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="1">备选项</el-radio>
          </el-form-item>
          <el-form-item label="频道列表"></el-form-item>
          <el-form-item label="时间选择">
            <el-date-picker
              v-model="timetotime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timetotime: '',
      articleForm: {
        begin_pubdate: '',
        end_pubdate: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
