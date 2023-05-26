import request from '@/utils/request'

export default{
    getListPage(){
        return request({
            method:'get',
            url:`/admin/core/borrowerInfo/list`,
        })
    },
    show(id){
        return request({
            method:'get',
            url:`/admin/core/borrowerInfo/show/${id}`,
        })
    },
    saveApproval(borrowerInFoApproval){
        return request({
            method:'post',
            url:"/admin/core/borrowerInfo/approval",
            data:borrowerInFoApproval
        })
    }

}