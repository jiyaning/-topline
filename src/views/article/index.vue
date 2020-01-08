<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form ref="articleFormRef" :model="articleForm" label-width="110px">
          <el-form-item label="文章状态">
            <el-radio v-model="articleForm.status" label="0">全部</el-radio>
            <el-radio v-model="articleForm.status" label="1">草稿</el-radio>
            <el-radio v-model="articleForm.status" label="2">待审核</el-radio>
            <el-radio v-model="articleForm.status" label="3">审核通过</el-radio>
            <el-radio v-model="articleForm.status" label="4">审核失败</el-radio>
          </el-form-item>
          <el-form-item label="频道列表">
            <el-select v-model="articleForm.channel_id" placeholder="请选择" clearable>
              <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择">
            <el-date-picker
              v-model="timetotime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format='yyyy-MM-dd'
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Article',
  created () {
    this.getchannelList()
  },
  data () {
    return {
      timetotime: [],
      channelList: [],
      articleForm: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      }
    }
  },
  watch: {
    timetotime: function (newv) {
      if (newv) {
        this.articleForm.begin_pubdate = newv[0]
        this.articleForm.end_pubdate = newv[1]
      } else {
        this.articleForm.begin_pubdate = ''
        this.articleForm.end_pubdate = ''
      }
    }
  },
  methods: {
    getchannelList () {
      let pro = this.$http({
        url: '/mp/v1_0/channels',
        method: 'GET'
      })
      pro
        .then(result => {
          this.channelList = result.data.data.channels
        })
        .catch(err => {
          return this.$message.error('获取列表频道失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
