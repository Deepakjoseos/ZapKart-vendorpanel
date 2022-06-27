import fetch from 'auth/FetchInterceptor'

const authVendorService = {}

authVendorService.getProfile = async function () {
  try {
    const res = await fetch({
      url: '/vendors',
      method: 'get',
    })

    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

authVendorService.createVendor = async function (data) {
  try {
    const res = await fetch({
      url: '/vendors/register',
      method: 'post',
      data,
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

authVendorService.editProfile = async function (data) {
  try {
    const res = await fetch({
      url: '/vendors',
      method: 'put',
      data,
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// authVendorService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default authVendorService
