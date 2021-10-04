## 基本标签

<el-menu :default-active="activeIndex" mode="horizontal">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-sub-menu index="2">
    <template #title>我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-sub-menu index="2-4">
      <template #title>选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4">订单管理</el-menu-item>
</el-menu>