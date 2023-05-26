<template>
  <div class="app-container">
    <!-- 列表 -->

    <el-table :data="list" stripe>
      <el-table-column type="index" label="序号" width="200" align="center" />

      <el-table-column prop="name" label="借款人姓名" width="200" />

      <el-table-column prop="mobile" label="手机" width="200" />

      <el-table-column prop="amount" label="借款金额" width="150" />

      <el-table-column label="借款期限" width="150">
        <template slot-scope="scope">{{ scope.row.period }}个月</template>
      </el-table-column>

      <el-table-column
        prop="params.returnMethod"
        label="还款方式"
        width="150"
      />

      <el-table-column prop="params.moneyUse" label="资金用途" width="100" />

      <el-table-column label="年化利率" width="90" prop="borrowYearRate">
        <template slot-scope="scope">
          {{ scope.row.borrowYearRate * 100 }}%
        </template>
      </el-table-column>

      <el-table-column prop="params.status" label="状态" width="100" />

      <el-table-column prop="createTime" label="申请时间" width="200" />

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">
            <router-link :to="'/borrower/info-detail/' + scope.row.id">
              查看
            </router-link>
          </el-button>

          <el-button
            v-if="scope.row.status === 1"
            type="warning"
            size="mini"
            @click="approvalShow(scope.row)"
          >
            审批
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审批对话框 -->

    <el-dialog title="审批" :visible.sync="dialogVisible" width="490px">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="是否通过">
          <el-radio-group v-model="borrowInfoApproval.status">
            <el-radio :label="2">通过</el-radio>

            <el-radio :label="-1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的名称">
          <el-input v-model="borrowInfoApproval.title" />
        </el-form-item>
        
        <!-- 传给后台的是STRING -->
        <el-form-item v-if="borrowInfoApproval.status == 2" label="起息日">
          <el-date-picker
            v-model="borrowInfoApproval.lendStartDate"
            type="date"
            placeholder="选择开始时间"
            format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="年化收益率">
          <el-input v-model="borrowInfoApproval.lendYearRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="服务费率">
          <el-input v-model="borrowInfoApproval.serviceRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="borrowInfoApproval.status == 2" label="标的描述">
          <el-input v-model="borrowInfoApproval.lendInfo" type="textarea" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>

        <el-button type="primary" @click="approvalSubmit"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import borrowerInfoApi from "@/api/core/borrowerinfo";
export default {
  data() {
    return {
      list: null,
      dialogVisible: false,
      borrowInfoApproval: {
        lendYearRate: 0,
        serviceRate: 5,
        id:""
      },
    };
  },

  components: {},

  created() {
    this.getBorrowerInfo();
  },

  computed: {},

  mounted: {},

  methods: {
    approvalSubmit() {
      borrowerInfoApi.saveApproval(this.borrowInfoApproval).then((r) => {
        this.$message.success("审批成功");
        this.getBorrowerInfo();
        this.dialogVisible = false;
      });
    },
    approvalShow(row) {
      this.borrowInfoApproval.id=row.id
      this.dialogVisible = true;
      this.borrowInfoApproval.lendYearRate = row.borrowYearRate * 100;
      //在提交之前，赋默认值
    },
    getBorrowerInfo() {
      borrowerInfoApi.getListPage().then((r) => {
        this.list = r.data.items;
      });
    },
  },
};
</script>
<style lang='css' scoped>
</style>