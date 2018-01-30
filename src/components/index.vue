<template lang="html">
  <el-row class="ymy-pagelist">
    <el-col :span="4" class="page-total">
      <span>共{{pageTotal}}页 共{{countTotal}}条</span>
    </el-col>
    <el-col :span="18" class="page-ctl-to">
      <el-row type="flex" justify="end" class="page-controls">
        <el-col :span="12" class="pagelist-ctl">
          <el-button icon="el-icon-arrow-left">上一页</el-button>
          <el-button @click="goPage(1)" :class="">1</el-button>
          <el-button v-if="mdlPageCount[0] > 2">...</el-button>
          <el-button v-for="count in mdlPageCount"
                     :key="count"
                     @click="goPage($event, count)">{{count}}</el-button>
          <el-button v-if="mdlPageCount[mdlLen-1] < (countTotal-1)">...</el-button>
          <el-button @click="goPage(pageData.length)">{{pageData.length}}</el-button>
          <el-button>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-col>
        <el-col :span="12">
          当前显示 &nbsp;
          <el-select v-model="value" tag="span" class="ymy-input" size="mini" width="100px" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> &nbsp; 条
          到第
          <input type="number" class="ymy-page-to" v-model="jumpPage">
          页
        </el-col>
      </el-row>
    </el-col>
    <div style="clear: both">
      {{this.$data.pageData[this.$data.pageData.length-1]}}
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '10',
        label: '10条'
      }, {
        value: '50',
        label: '50条'
      }, {
        value: '100',
        label: '100条'
      }, {
        value: '500',
        label: '500条'
      }],
      pageData: [],
      value: 10,
      pageNum: 1,
      jumpPage: 1,
      start: 2,
      countTotal: 0,
      mdlLen: 5
    }
  },
  created() {
    for (let i = 0; i < 10; i ++) {
      this.pageData.push(Math.floor(Math.random() * 101));
    }
    this.countTotal = this.pageData.length;
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.countTotal / this.value);
    },
    mdlPageCount() {
      let tempArr = [];
      for (let i = 0; i < this.mdlLen; i ++) {
        tempArr[i] = this.start++;
      }
      return tempArr;
    },
    isActive() {

    }
  },
  watch: {

  },
  methods: {
    goPage(event,count) {
      let avg = Math.floor(this.mdlLen / 2);

      this.mdlPageCount[avg] = count;
      if((count - avg) > 1 && (count + avg -1) < (this.countTotal-1)) this.start = count - avg;
    }
  },
  mounted: function(){

  }
}
</script>

<style lang="scss">
  .ymy-pagelist {
    .page-controls {
      text-align: right;
    }
    .el-button {
      padding: 4px 7px;
    }
    .page-total, .page-ctl-to {
      color: #999;
    }
    .pagelist-ctl {
      white-space: nowrap;
    }
    .ymy-input {
      width: 90px;
    }
    .ymy-page-to {
      -webkit-appearance: none;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      line-height: 1;
      outline: 0;
      padding: 0 3px 0 15px;
      width: 60px;
      height:28px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
    .active {
      color: dodgerblue;
    }
  }
</style>
