<!--前端页面之间的数据共享
   1.浏览器缓存
   2.请求参数方式
 -->
<template>
  <div>
    <!-- 输入表单 -->

    <el-form label-width="120px">
      <el-form-item label="借款额度">
        <el-input-number v-model="integralGrade.borrowAmount" :min="0" />
      </el-form-item>

      <el-form-item label="积分区间开始">
        <el-input-number v-model="integralGrade.integralStart" :min="0" />
      </el-form-item>

      <el-form-item label="积分区间结束">
        <el-input-number v-model="integralGrade.integralEnd" :min="0" />
      </el-form-item>

      <el-form-item >
        <el-button 
          :style="{ display: this.$route.params.id===undefined?'':'none' }"
          type="primary"
          @click="save()">保存
        </el-button>
      </el-form-item>

      <el-form-item >
        <el-button 
          :style="{ display: this.$route.params.id===undefined?'none':'' }"
          type="primary"
          @click="update()">更新
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import integralGradeApi from "@/api/core/integral-grade";

export default {
  data() {
    return {
      integralGrade: {
        borrowAmount: "",
        integralStart: "",
        integralEnd: "",
      }, // 初始化数据
      saveBtnDisabled: false, // 保存按钮是否禁用，防止表单重复提交
    
    };
  },
  created () {
     if (this.$route.params.id) {
        this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    fetchDataById(id) {
      integralGradeApi.getById(id).then((response) => {
        this.integralGrade = response.data.item;
      });
    },
    save() {
      if (this.integralGrade.borrowAmount <= 0) {
        this.$message.warning("请输入大于零的借款额度");
        //  this.saveBtnDisabled = false;
        return;
      }
      if (this.integralGrade.integralStart <= 0) {
        this.$message.warning("请输入大于零的积分区间");
        //  this.saveBtnDisabled = false;
        return;
      }
      if (this.integralGrade.integralEnd <= 0) {
        this.$message.warning("请输入大于零的积分区间");
        // this.saveBtnDisabled = false;
        return;
      }

      integralGradeApi.save(this.integralGrade).then((r) => {
        this.$message.success("添加成功");
        //清楚缓存对象
        this.integralGrade = {};
        //通过路由跳转到积分等级列表页面
        this.$router.push("/integral-grade");
      });
    },
    update(){
         if (this.integralGrade.borrowAmount <= 0) {
        this.$message.warning("请输入大于零的借款额度");
        //  this.saveBtnDisabled = false;
        return;
      }
      if (this.integralGrade.integralStart <= 0) {
        this.$message.warning("请输入大于零的积分区间");
        //  this.saveBtnDisabled = false;
        return;
      }
      if (this.integralGrade.integralEnd <= 0) {
        this.$message.warning("请输入大于零的积分区间");
        // this.saveBtnDisabled = false;
        return;
      }

      integralGradeApi.updateById(this.integralGrade).then((r) => {
        this.$message.success("更新成功");
        //清楚缓存对象
        this.integralGrade = {};
        //通过路由跳转到积分等级列表页面
        this.$router.push("/integral-grade");
      });
    }
  },
};
</script>
<style>
</style>