<template>
  <div style="padding: 20px">
    <div style="text-align: center; margin-top: 20px">
      <!--查询表单-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="searchObj.mobile" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select
            v-model="searchObj.userType"
            placeholder="请选择"
            clearable
          >
            <el-option label="投资人" value="1" />
            <el-option label="借款人" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="searchObj.status" placeholder="请选择" clearable>
            <el-option label="正常" value="1" />
            <el-option label="锁定" value="0" />
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getUserInfo()">
          查询
        </el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
    </div>
    <el-table :data="list" border="true">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="userType" label="用户类型" width="80">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.userType === 1">投资人</el-tag>
          <el-tag type="success" v-else>借款人</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="nickName" label="用户姓名"> </el-table-column>
      <el-table-column prop="idCard" label="身份证号码"> </el-table-column>
      <el-table-column prop="integral" label="用户积分"> </el-table-column>
      <el-table-column prop="createTime" label="注册时间"> </el-table-column>
      <el-table-column prop="bindStatus" label="绑定状态" width="100">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.bindStatus === 0"
            >未绑定</el-tag
          >
          <el-tag type="success" v-else-if="scope.row.bindStatus === 1"
            >绑定成功</el-tag
          >
          <el-tag type="warning" v-else>绑定失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.status === 0">锁定</el-tag>
          <el-tag type="success" v-else>正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!--如果锁定的状态，点击按钮传正常值 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.status == 0 ? 'primary' : 'success'"
            @click="handleLock(scope.row, scope.row.status == 0 ? '1' : '0')"
          >
            {{ scope.row.status === 0 ? "解锁" : "锁定" }}</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleLoginRecord(scope.row)"
            >登录日志</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="登录日志" :visible.sync="dialogTableVisible">
        <el-table :data="loginRecords" border="true">
          <el-table-column property="ip" label="IP" width="380"></el-table-column>
          <el-table-column property="createTime" label="登录时间" ></el-table-column>
        </el-table>
      </el-dialog>
  </div>
</template>


<script>
import userApi from "@/api/core/user";

export default {
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      list: [],
      searchObj: {},
      loginRecords: [],
      dialogTableVisible:false
    };
  },
  methods: {
    resetData() {
      this.searchObj = {};
      this.pageNum = 1;
      this.pageSize = 10;
      this.getUserInfo();
    },
    handleLock(row, type) {
      //0:锁定 1：解锁，正常
      console.log(type);
      userApi.lockUser(row.id, type).then((r) => {
        this.$message.success("操作成功");
        this.getUserInfo();
      });
    },
    handleLoginRecord(row) {
      console.log(row.id)
       userApi.getLockRecord(row.id).then((r)=>{
            this.loginRecords=r.data.items
            this.dialogTableVisible=true
       })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getUserInfo();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getUserInfo();
    },
    getUserInfo() {
      userApi
        .getUserInfo(this.pageSize, this.pageNum, this.searchObj)
        .then((r) => {
          this.list = r.data.page.records;
          this.total = r.data.page.total;
        });
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style>
</style>