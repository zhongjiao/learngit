<template>
  <el-container class="main_view-container">
    <el-header class="main_view-container-head">Header</el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">静态</template>
              <el-menu-item index="1-1">
                <router-link to="/character-data">学生资料</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/page">分页</router-link>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="动态">
              <el-menu-item index="1-3">
                <router-link to="/atom-animate">粒子动画</router-link>
                </el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container class="main_content-container">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {

      }
    }
  };
</script>
<style lang="scss">
  .main_view-container {

    position: absolute;
    height: 100%;
    width: 100%;

    .main_view-container-head {

      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }

    .main_content-container {

      padding: 20px;
    }
  }
</style>
