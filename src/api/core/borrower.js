import request from '@/utils/request'
export default{
    getListPage(pageNum,pageSize,keyWord){
        return request({
            method:'get',
            url:`/admin/core/borrower/listBorrowerPage/${pageNum}/${pageSize}`,
            params:{keyWord}//?keyWord=keyWord
        })
    },
    saveApproval(approval){
        return request({
            method:'post',
            url:"/admin/core/borrower/",
            data:approval
        })
    }
}