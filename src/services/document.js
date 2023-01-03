import fetch from 'auth/FetchInterceptor'

const vendorService = {}

vendorService.getVendors = async function() {
    try{
        const res = await fetch({
            url: 'https://ecommercelive.riolabz.com/api/v1/vendors',
            method : 'get'
        })
        return res
    } catch (err) {
        console.log(err, 'show-err');
    }
}

vendorService.createVendorDocument = async function (data) {
    try {
        const res = await fetch({
          url:`https://ecommercelive.riolabz.com/api/v1/vendors/document`,
          method: 'post',
          data: data
        })
        return res
      } catch (err) {
        console.log(err, 'show-err')
      }
  }
  
  vendorService.deleteVendorDocument = async function (docId) {
    try {
        const res = await fetch({
          url:`https://ecommercelive.riolabz.com/api/v1/vendors/document/${docId}`,
          method: 'delete'
        })
        return res
      } catch (err) {
        console.log(err, 'show-err')
      }
  }
  
  vendorService.updateVendorDocument = async function (docId, data) {
    try {
        const res = await fetch({
          url:`https://ecommercelive.riolabz.com/api/v1/vendors/document/${docId}`,
          method: 'put',
          data: data
        })
        return res
      } catch (err) {
        console.log(err, 'show-err')
      }
  }
  

export default vendorService;