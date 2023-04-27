<template>
  <div class="app-container">
    <el-form label-width="100px" class="form-table">
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态">
            {{ borrower.status }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="创建时间">
            {{ borrower.createTime }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="收入">
            {{ borrower.income }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="姓名">
            {{ borrower.name }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="性别">
            {{ borrower.sex }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="年龄">
            {{ borrower.age }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="手机">
            {{ borrower.mobile }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="学历">
            {{ borrower.education }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="是否结婚">
            {{ borrower.marry }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="行业">
            {{ borrower.industry }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="还款来源">
            {{ borrower.returnSource }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="身份证号">
            {{ borrower.idCard }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="联系人名称">
            {{ borrower.contactsName }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="联系人手机">
            {{ borrower.contactsMobile }}
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="联系人关系">
            {{ borrower.contactsRelation }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            :label="item.imageName"
            v-for="item in borrower.borrowerAttachList"
            :key="item.id"
          >
            <el-image
              style="width: 150px"
              :src="item.imageUrl"
              :preview-src-list="[item.imageUrl]"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="text-align: center">
        <el-button @click="back"> 返回 </el-button>
      </el-row>
    </el-form>

    <el-form label-width="170px" v-if="borrower.status === '认证中'">
      <el-form-item label="是否通过">
        <el-radio-group v-model="approvalForm.status">
          <el-radio :label="2"> 通过 </el-radio>

          <el-radio :label="-1"> 不通过 </el-radio>
        </el-radio-group>
      </el-form-item>
      
      <!--认证完通过是不显示的  -->
      <el-form-item v-if="approvalForm.status == 2" label="基本信息积分">
        <el-input v-model="approvalForm.infoIntegral" style="width: 140px" />

        <span style="color: indianred">（可获取30至100积分）</span>
      </el-form-item>

      <el-form-item v-if="approvalForm.status == 2" label="身份证信息是否正确">
        <el-radio-group v-model="approvalForm.isIdCardOk">
          <el-radio :label="true"> 是 </el-radio>

          <el-radio :label="false"> 否 </el-radio>
        </el-radio-group>

        <span style="color: indianred">（可获得积分30积分）</span>
      </el-form-item>

      <el-form-item v-if="approvalForm.status == 2" label="车辆信息是否正确">
        <el-radio-group v-model="approvalForm.isCarOk">
          <el-radio :label="true"> 是 </el-radio>

          <el-radio :label="false"> 否 </el-radio>
        </el-radio-group>

        <span style="color: indianred">（可获得积分60积分）</span>
      </el-form-item>

      <el-form-item v-if="approvalForm.status == 2" label="房产信息是否正确">
        <el-radio-group v-model="approvalForm.isHouseOk">
          <el-radio :label="true"> 是 </el-radio>

          <el-radio :label="false"> 否 </el-radio>
        </el-radio-group>

        <span style="color: indianred">（可获得积分100积分）</span>
      </el-form-item>

      <el-row style="text-align: center">
        <el-button type="primary" @click="approvalSubmit()"> 确定 </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import borrowerDetailApi from "@/api/core/borrower-detail";
import borrowerApi from "@/api/core/borrower";
export default {
  data() {
    return {
      borrower: {},

      saveBtnDisabled: false,

      //审批结果对象
      approvalForm: {
        borrowerId: 0,

        status: 2,

        content: "",

        infoIntegral: 30,

        isIdCardOk: false,

        isHouseOk: false,

        isCarOk: false,
      },
    };
  },
  created() {
    if (this.$route.params.id) {
      this.getBorrowerDetail();
    }
  },
  methods: {
    approvalSubmit() {
        this.approvalForm.borrowerId=this.$route.params.id;
        borrowerApi.saveApproval(this.approvalForm).then(r=>{
            this.$message.success("审批信息成功");
            this.$router.push({ path: "/borrower" });
        })

    },
    back() {
      this.$router.push({ path: "/borrower" });
    },
    getBorrowerDetail() {
      borrowerDetailApi.show(this.$route.params.id).then((r) => {
        this.borrower = r.data.item;
      });
    },
  },
};
</script>

<style>
</style>