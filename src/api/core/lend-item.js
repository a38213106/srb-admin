import request from '@/utils/request'
export default{
    getList(lendId){
        return request({
            url:`/admin/core/lendItem/list/${lendId}`,
            method:'get'
        })
    },
    show(id){
        return request({
            url:`/admin/core/lend/show/${id}`,
            method:'get'
        })
    },
    makeLoad(id){
        return request({
            url:`/admin/core/lend`,
            method:'put',
            params:{id}
        })
    },
}