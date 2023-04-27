<template>
  <div>
    <div style="padding: 20px">
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="dialogFormVisible1 = true"
        >导入EXCEL</el-button
      >

      <el-button type="primary" icon="el-icon-upload" @click="handleExport"
        >导出EXCEL</el-button
      >

      <div style="padding: 20px">
        <el-table
          :data="dicts"
          style="width: 100%"
          row-key="id"
          border
          lazy
          :load="load"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="value" label="值"> </el-table-column>
          <el-table-column prop="dictCode" label="编码"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                @click="
                  dialogFormVisible = true;
                  handleEdit(scope.$index, scope.row);
                "
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 上传对话框:
          导入EXCEL按钮，弹出对话框，对话框提示上传文件可以选择文件
          name是上传的文件名称，默认是file
      -->

      <el-dialog title="导入数据字典" :visible.sync="dialogFormVisible1">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="uploadPath"
          :auto-upload="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :limit="1"
          name="excel"
          :on-exceed="handleExceed"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">只能上传EXCEL文件</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="数据字典" :visible.sync="dialogFormVisible">
        <div style="padding: 20px">
          <el-form
            :model="form"
            label-width="80px"
            :label-position="labelPosition"
          >
            <el-form-item label="名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="值">
              <el-input v-model="form.value"></el-input>
            </el-form-item>
            <el-form-item label="编码">
              <el-input v-model="form.dictCode"></el-input>
            </el-form-item>
            <el-form-item label="上级id">
              <el-input v-model="form.parentId"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogFormVisible = false;
              updateDict();
            "
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dictApi from "@/api/core/dict";
export default {
  data() {
    return {
      labelPosition: "left",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      uploadPath: "http://192.168.72.128:8090/admin/core/dict/import",
      parentId: "1",
      dicts: [],
      //:model绑定的是对象，所以只能用对象类型来定义,不能用数组
      form: {
        name: "",
        value: "",
        dictCode: "",
        parentId: "",
      },
    };
  },
  created() {
    this.getDictParentId();
  },
  methods: {
    //编辑按钮反显对象
    handleEdit(index, row) {
      dictApi.getDictById(row.id).then((r) => {
        console.log(r.data.item);
        this.form = r.data.item;
      });
    },
    //更新数据字典对象
    updateDict() {
      dictApi.updateDict(this.form).then((r) => {
        if (r.code === 0) {
          this.$message.success("更新成功");
          //清楚缓存对象
          this.form = {};
          //刷新页面
          window.location.reload();
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除数据字典, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
          dictApi.deleteById(row.id).then((r) => {
        if (r.code === 0) {
          this.$message.success("删除成功");
          window.location.reload();
        }
      });
      }) 
    },
    //表格绑定的懒加载函数，只有点击下一级才触发后台接口
    //选中这行的DICT数据显示下级数据
    load(tree, treeNode, resolve) {
      dictApi.getDictListByParentId(tree.id).then((r) => {
        resolve(r.data.items);
      });
    },
    getDictParentId() {
      dictApi.getDictListByParentId(this.parentId).then((r) => {
        this.dicts = r.data.items;
      });
    },

    handleExport() {
      window.location = "http://192.168.72.128:8090/admin/core/dict/export";
    },
    //上传按钮单击事件
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleUploadSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.$message.success("上传成功");
        this.$refs.upload.clearFiles();
        this.dialogFormVisible = false;
      } else {
        this.$message.error(response.msg);
      }
    },
    handleUploadError(err, file, fileList) {
      this.$message.error("网络异常");
    },
    handleExceed() {
      console.log("文件超出limit文件个数");
    },
  },
};
</script>