<template>
  <div></div>
</template>
<script>
import { debounce } from '@/utils/index'
let echarts = require('echarts')
// require('echarts/lib/chart/bar')
// require('echarts/lib/component/tooltip')
export default {
  name: 'Enterprise',
  title: {
    show: true
  },
  props: {
    e_user_count: {
      type: String,
      default: '0'
    },
    getCompanyUserLogin_count: {
      type: String,
      default: '0'
    },
    is_week_month: {
      type: String,
      default: '1'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    xData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    yData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    // 初始化，绘制图表
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        title: {
          text: `企业总人数：${this.e_user_count}  ${this.is_week_month === '1' ? '本周' : '本月'}登陆人数：${this.getCompanyUserLogin_count}`,
          textAlign: 'left',
          x: 70,
          textStyle: {
            fontSize: 14
          }
        },
        backgroundColor: '#FFF',
        grid: {
          top: '9%',
          bottom: '19%',
          left: '6%',
          right: '4%'
        },
        tooltip: {
          trigger: 'axis',
          label: {
            show: true
          }
        },
        xAxis: {
          boundaryGap: true, // 默认，坐标轴留白策略
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          data: this.yData
        },
        yAxis: {
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(33,148,246,0.2)'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: '{value}%'
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: 'rgb(245,250,254)'
            }
          }
        },
        series: [
          {
            type: 'line',
            symbol: 'circle',
            symbolSize: 7,
            lineStyle: {
              color: 'rgb(33,148,246)',
              shadowBlur: 12,
              shadowColor: 'rgb(33,148,246,0.9)',
              shadowOffsetX: 1,
              shadowOffsetY: 1
            },
            itemStyle: {
              color: 'rgb(33,148,246)',
              borderWidth: 1,
              borderColor: '#FFF'
            },
            label: {
              show: false,
              distance: 1,
              emphasis: {
                show: true,
                offset: [25, -2],
                color: '#FFF',
                padding: [8, 20, 8, 6],
                height: 36,
                formatter: function(params) {
                  var name = params.name
                  var value = params.data
                  var str = name + '\n数据量：' + value
                  return str
                },
                rich: {
                  bg: {
                    width: 78,
                    color: '#FFF',
                    padding: [20, 0, 20, 10]
                  },
                  br: {
                    width: '100%',
                    height: '100%'
                  }
                }
              }
            },
            data: this.xData
          }
        ]
      })
    }
  },
  watch: {
    xData() {
      this.initChart()
      this.__resizeHandler()
    },
    yData() {
      this.initChart()
      this.__resizeHandler()
    }
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
    this.$el.style.width = this.width
    this.$el.style.height = this.height
    this.initChart()
  }
}
</script>
