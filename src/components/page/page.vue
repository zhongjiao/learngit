<template lang="html">
  <el-row class="ymy-pagelist">
    <el-col :span="4" class="page-total">
      <span>共{{pageTotal}}页 共{{countTotal}}条</span>
    </el-col>
    <el-col :span="18" class="page-ctl-to">
      <el-row type="flex" justify="end" class="page-controls">
        <el-col :span="12" class="pagelist-ctl">
          <el-button icon="el-icon-arrow-left" @click="prePage">上一页</el-button>
          <el-button @click="goPage(1)" :class="{active: isActive == 1}">1</el-button>
          <span class="page-btn page-btn-more"
                :class="arrowLeft"
                v-show="mdlPageCount[0] > 2"
                @click.stop="prevTurnPage"
                @mouseenter.native="arrowLeft = 'el-icon-d-arrow-left'"
                @mouseleave.native="arrowLeft = 'el-icon-more'"
          ></span>
          <button class="page-btn" v-for="count in mdlPageCount"
                     :key="count"
                     @click="goPage(count)"
                     :class="{active: isActive == count}">{{count}}</button>
          <span class="page-btn page-btn-more"
                :class="arrowRight"
                v-show="mdlPageCount[mdlLen-1] < (pageTotal-1)"
                @click.stop="nextTurnPage"
                @mouseenter.native="arrowRight = 'el-icon-d-arrow-right'"
                @mouseleave.native="arrowRight = 'el-icon-more'"></span>
          <el-button @click="goPage(pageTotal)"
                     :class="{active: isActive == pageTotal}">{{pageTotal}}</el-button>
          <el-button @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
          <input type="number"
                 class="ymy-page-to"
                 @keyup.enter="jumpToPage(jumpPage)"
                 v-model="jumpPage">
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
        countTotal: 0,
        mdlLen: 5,
        isActive: 1,
        arrowLeft: 'el-icon-more',
        arrowRight: 'el-icon-more'
      }
    },
    created() {
      for (let i = 0; i < 201; i ++) {
        this.pageData.push(Math.floor(Math.random() * 101));
      }
      this.countTotal = this.pageData.length;
    },
    computed: {
      pageTotal() {
        return Math.ceil(this.countTotal / this.value);
      },
      mdlPageCount() {
        let tempArr = [], start;
        let avg = Math.floor(this.mdlLen / 2);

        if(this.pageTotal > this.mdlLen) {
          if((this.isActive - avg) > 1 && (this.isActive + avg -1) < (this.pageTotal - 1)) start = this.isActive - avg;
          if((this.isActive - avg) <= 1) start = 2;
          if((this.isActive + avg -1) >= (this.pageTotal - 1)) start = this.pageTotal - this.mdlLen;
        }
        for(let i = start; i < (this.mdlLen + start); i ++) {
          tempArr.push(i);
        }
        return tempArr;
      }
    },
    methods: {
      prevTurnPage() {
        this.isActive -= this.mdlLen;
      },
      nextTurnPage() {
        this.isActive += this.mdlLen;
      },
      goPage(page) {
        this.isActive = page;
      },
      jumpToPage(page) {
        let p = Number(page);
        if(p > this.pageTotal) this.isActive = this.pageTotal;
        if(p < 1) this.isActive = 1;
        if(p >=1 && p <= this.pageTotal) this.isActive = p;
      },
      prePage() {
        if(this.isActive > 1) this.isActive --;
      },
      nextPage() {
        if(this.isActive < this.pageTotal) this.isActive ++;
      }
    }
  }
</script>

<style lang="scss">
  .ymy-pagelist {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
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
    .el-button--default:hover {
      color: #fff;
      background-color: dodgerblue;
      border-color: dodgerblue;
    }
    .page-btn {
      padding: 4px 7px;
      display: inline-block;
      text-align: center;
      margin-left: 10px;
      background-color: #fff;
      border-radius: 3px;
      outline: none;
      border: 1px solid #dcdfe6;
      color: #606266;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: dodgerblue;
        border-color: dodgerblue;
      }
    }
    .page-btn-more {
      position: relative;
      top: 1px;
      padding: 3px 7px;
    }
    .active {
      background-color: dodgerblue;
      border-color: dodgerblue;
      color: #fff;
    }
  }
</style>
