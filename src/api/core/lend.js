import request from '@/utils/request'
export default{
    getList(){
        return request({
            url:'/admin/core/lend/list',
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