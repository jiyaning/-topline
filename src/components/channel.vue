<template>
  <el-select v-model="nowid" placeholder="请选择" clearable>
    <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'channel',
  data () {
    return {
      channelList: [],
      nowid: ''
    }
  },
  props: {
    chid: {
      default: ''
    }
  },
  watch: {
    // A. 由于需要把选中的频道传递给父组件，故声明watch监听器以实现功能
    nowid (newV) {
      // 选中的频道传递给父组件
      this.$emit('slt', newV)
    },
    chid (newV) {
      this.nowid = newV
    }
  },
  created () {
    this.getchannelList()
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
