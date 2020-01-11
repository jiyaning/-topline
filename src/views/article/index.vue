<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form ref="articleFormRef" :model="articleForm" label-width="110px">
          <el-form-item label="文章状态">
            <el-radio v-model="articleForm.status" label>全部</el-radio>
            <el-radio v-model="articleForm.status" label="0">草稿</el-radio>
            <el-radio v-model="articleForm.status" label="1">待审核</el-radio>
            <el-radio v-model="articleForm.status" label="2">审核通过</el-radio>
            <el-radio v-model="articleForm.status" label="3">审核失败</el-radio>
            <el-radio v-model="articleForm.status" label="4">已删除</el-radio>
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
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{total}}条符合条件的内容</span>
      </div>
      <el-table :data="articleList" style="width: 100%">
        <el-table-column label="图标">
          <img
            :src="stData.row.cover.images[0]"
            alt="没有图标"
            style="width:150px;height:100px"
            slot-scope="stData"
          />
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="stData">
            <el-tag type="warning" v-if="stData.row.status===0">草稿</el-tag>
            <el-tag type="info" v-else-if="stData.row.status===1">待审核</el-tag>
            <el-tag type="success" v-else-if="stData.row.status===2">审核通过</el-tag>
            <el-tag type="danger" v-else-if="stData.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-else-if="stData.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="stData">
            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="articleDel(stData.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="articleForm.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Article',
  created () {
    this.getchannelList()
    this.getArticleList()
  },
  data () {
    return {
      timetotime: [],
      total: 0,
      channelList: [],
      articleList: [],
      articleForm: {
        page: 1,
        per_page: 10,
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
    },
    articleForm: {
      handler: function (newv) {
        this.getArticleList()
      },
      deep: true
    }
  },
  methods: {
    // 页码大小变动时候触发的事件
    handleSizeChange (val) {
      this.articleForm.per_page = val
    },
    // 当前页变动时候触发的事件
    handleCurrentChange (val) {
      this.articleForm.page = val
    },
    articleDel (aid) {
      this.$confirm('是否删除该文章', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let pro = this.$http({
            url: '/mp/v1_0/articles/' + aid,
            method: 'delete'
          })
          pro
            .then(result => {
              this.$message({
                type: 'success',
                duration: 1000,
                message: '删除成功!'
              })
              this.getArticleList()
            })
            .catch(err => {
              this.$message.error('删除文章错误' + err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            duration: 1000,
            message: '已取消删除'
          })
        })
    },
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
    },
    getArticleList () {
      let articleForm = {}
      for (var i in this.articleForm) {
        if (this.articleForm[i] || this.articleForm[i] === 0) {
          articleForm[i] = this.articleForm[i]
        }
      }
      let pro = this.$http({
        url: '/mp/v1_0/articles',
        method: 'GET',
        params: articleForm
      })
      pro
        .then(result => {
          console.log(result)
          this.articleList = result.data.data.results
          this.total = result.data.data.total_count
        })
        .catch(err => {
          return this.$message.error('获取文章列表失败' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
