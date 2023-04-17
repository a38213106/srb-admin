import request from '@/utils/request'

export default{
       getUserInfo(pageSize,pageNum,searchObj){
          return request({
               url:`/admin/core/user/list/${pageSize}/${pageNum}`,
               method:'get',
               //因为是带路径的参数请求对象，所以只能用params
               params:searchObj
          })
     },
       lockUser(id,type){
           return request({
            url:`/admin/core/user/lock/${id}/${type}`,
            method:'put'
           })
     },
       getLockRecord(userId){
          return request({
               url:`admin/core/loginRecord/${userId}`,
               method:'get'
          })
       }
      
}