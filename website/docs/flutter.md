## 安装

<el-card class="box-card">
  <template #header>
    <div class="card-header">
      <span>标签</span>
    </div>
  </template>
  <el-popover placement="bottom" title="标题" :width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <template #reference>
      <el-button>click 激活</el-button>
    </template>
  </el-popover>
</el-card>
