<template>
    <div class="character-data">
      <el-header class="main_content-head">
        <div class="main_content-head-filter">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <span>王小虎</span>
        </div>
      </el-header>

      <el-main>

      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
      </el-main>
    </div>
</template>

<script>
  export default {
    name: "character-data",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(30).fill(item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .character-data {
    width: 100%;
    box-shadow: 0 0 25px 1px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    .main_content-head {

      padding-right: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 12px;
      background-color: khaki;
    }
    .main_content-head-filter{

      cursor: pointer;
      &:hover {
        color: darkred;
        text-shadow: 1px 0px 0 dodgerblue;
      }
    }
  }
</style>
