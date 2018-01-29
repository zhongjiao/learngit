<template lang="html">
  <el-row class="ymy-pagelist">
    <el-col :span="4" class="page-total">
      <span>共{{pageTotal}}页 共{{countTotal}}条</span>
    </el-col>
    <el-col :span="18" class="page-ctl-to">
      <el-row type="flex" justify="end" class="page-controls">
        <el-col :span="12" class="pagelist-ctl">
          <el-button icon="el-icon-arrow-left">上一页</el-button>
          <el-button>1</el-button>
          <el-button>...</el-button>
          <el-button>2</el-button>
          <el-button>3</el-button>
          <el-button>4</el-button>
          <el-button>5</el-button>
          <el-button>6</el-button>
          <el-button>...</el-button>
          <el-button>7</el-button>
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
          <input type="number" class="ymy-page-to" v-model="goPage">
          页
        </el-col>
      </el-row>
    </el-col>
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
      value: '',
      pageNum: 1,
      goPage: 1,
      input: 0,
      pageTotal: 100,
      countTotal: 1000
    }
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
  }
</style>
