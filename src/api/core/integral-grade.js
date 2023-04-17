import request from '@/utils/request'


export default{
    //baseURL已经在request配置中赋值
     getList(){
        return request({
            url:`admin/core/integralGrade`,
            method: 'get'
        })
     },
     save(integralGrade){
        return request({
            url:`admin/core/integralGrade`,
            method:'post',
            data:integralGrade,
        })
     },
     delById(id){
        return request({
            url:`admin/core/integralGrade/${id}`,
            method:'delete'
        })
     },
     getById(id){
        return request({
            url:`admin/core/integralGrade/${id}`,
            method:'get'
        })
     },
     updateById(integralGrade){
        return request({
            url:`admin/core/integralGrade`,
            method:'put',
            data:integralGrade
           
        })
     },
     getPage(pageNum,pageSize){
        return request({
            url:`admin/core/integralGrade/list/${pageNum}/${pageSize}`,
            method:'get'
        })
     },
     batchDel(ids){
         return request({
            url:`admin/core/integralGrade/batchDel`,
            method:'delete',
            //请求参数体对象，放data里面
            data:ids
         })
     }

}