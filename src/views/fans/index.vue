<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>详情分析</span>
  </div>
  <div id="main" class="text item" style="height:400px"></div>
  <el-divider></el-divider>
  <div id="main2" class="text item" style="height:400px"></div>
</el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'fans',
  data () {
    return {
      fansInfoList: {}
    }
  },
  computed: {
    ageoption () {
      let arr = []
      for (var key in this.fansInfoList.age) {
        arr.push(key)
      }
      return arr
    },
    ageValoption () {
      let arr = []
      for (var key in this.fansInfoList.age) {
        arr.push(this.fansInfoList.age[key])
      }
      return arr
    },
    deviceoption () {
      let arr = []
      for (var key in this.fansInfoList.device) {
        arr.push(key)
      }
      return arr
    },
    deviceVal () {
      let device = this.fansInfoList.device
      let arr = []
      for (var key in device) {
        arr.push({ value: device[key], name: key })
      }
      return arr
    }

  },
  created () {
    this.getFansList()
  },
  mounted () {
    // this.paintPic()
  },
  methods: {
    getFansList () {
      let pro = this.$http({
        url: '/mp/v1_0/statistics/followers',
        method: 'get'
      })
      pro
        .then(result => {
          console.log(result)
          this.fansInfoList = result.data.data
          console.log(this.ageValue)
          console.log(this.deviceoption)
          this.paintPic()
          this.paintPic2()
        })
        .catch(err => {
          this.$message.error('获取评论列表错误' + err)
        })
    },
    paintPic () {
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: {
          text: '粉丝年龄分析',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.ageoption
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.ageValoption,
          type: 'line',
          smooth: true
        }]
      })
    },
    paintPic2 () {
      var myChart2 = echarts.init(document.getElementById('main2'))
      myChart2.setOption({
        title: {
          text: '粉丝设备分析',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: this.deviceoption
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.deviceVal
          }
        ]
      })
    }

  }
}
</script>

<style lang="less" scoped>
</style>
