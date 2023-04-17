import request from '@/utils/request'
export default{
    getDictListByParentId(parentId){
        return request({
            method:'get',
            url:'admin/core/dict/dictByParentId/'+parentId
        })
    },

    deleteById(id){
         return request({
            url:`admin/core/dict/${id}`,
            method:'delete'
         })
    },
    
    getDictById(id){
          return request({
             url:`admin/core/dict/${id}`,
             method:'get'
          })
    },

    updateDict(dict){
        return request({
            url:'admin/core/dict',
            method:'put',
            data:dict
        })
    }
    
}