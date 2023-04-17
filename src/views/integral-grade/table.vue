
<template>
  <div style="padding: 10px">
    <div>
      <el-button type="danger" @click="batchDel()" plain>批量删除</el-button>
    </div>
    <el-table :data="list" border style="width: 100%" @selection-change="selectionChange">
      <el-table-column type="selection" width="55" > </el-table-column>
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="borrowAmount" label="借款额度"> </el-table-column>
      <el-table-column prop="integralStart" label="积分区间开始">
      </el-table-column>
      <el-table-column prop="integralEnd" label="积分区间结束">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import integralGradeApi from "@/api/core/integral-grade";
export default {
  /*
      项目中发送异步请求，代码被拆分成以下几部分
         1.axios全局配置(@/utils/request.js)
         2.axios要访问的一个模块所有的异步访问代码(@/api/integralGrade.js)
         3.在需要异步访问的页面中，引入api模块js文件，调用方法得到异步结果并使用
    */

  //积分等级展示列表

  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      selection:[]
    };
  },
  methods: {
    //选中事件
    selectionChange(selection){
        this.selection=selection;
    },
    batchDel() {
       // 1.判断选中删除的积分等级是否为空，为空的话警告提示
        if(this.selection.length===0){
          this.$message.warning('请选要删除的积分等级');
          return;
        }
      //2.把参数赋值到数组中去
        let ids=[];
        this.selection.forEach(item=>{
             ids.push(item.id);
        })
      //3.调批量删除api
        this.$confirm("此操作将永久删除积分等级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          integralGradeApi.batchDel(ids).then(() => {
            this.$message.success("删除积分等级成功");
            this.getPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getPage() {
      integralGradeApi.getPage(this.pageNum, this.pageSize).then((r) => {
        this.list = r.data.page.records;
        this.total = r.data.page.total;
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getPage();
    },
    handleCurrentChange(num) {
      this.pageNum = num;
      this.getPage();
    },
    handleEdit(idx, row) {
      //$router是代表路由文件，$route是代表当前页面的路由对象
      this.$router.push({name:'integralGradeForm',params:{id:row.id}});
      //可以用以下方式传递参数
      //1请求参数传参  this.$router.push(`url?id=${row.id}`)
    },
    handleDelete(idx, row) {
      this.$confirm("此操作将永久删除积分等级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          integralGradeApi.delById(row.id).then((r) => {
            this.$message.success("删除积分等级成功");
            this.getPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getPage();
  },
};
</script>
<style>
</style>