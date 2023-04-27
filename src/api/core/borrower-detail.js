import request from '@/utils/request'
export default{
    show(id){
        return request({
            method:'get',
            url:`/admin/core/borrower/show/${id}`,
        })
    }
}