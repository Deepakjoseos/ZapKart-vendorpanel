// const dev = {
//   //   API_ENDPOINT_URL: 'https://jsonplaceholder.typicode.com'
//   API_ENDPOINT_URL: 'https://ecommercelive.riolabz.com/api/v1',
// }

// const prod = {
//   API_ENDPOINT_URL: 'https://ecommercelive.riolabz.com/api/v1',
// }

// const test = {
//   API_ENDPOINT_URL: 'https://ecommercelive.riolabz.com/api/v1',
// }
const SITE_NAME = process.env.REACT_APP_SITE_NAME

const dev = {
  //   https://ecommercelive.riolabz.com'
  API_ENDPOINT_URL:
    SITE_NAME === 'zapkart'
      ? 'https://ecommercelive.riolabz.com/api/v1'
      : SITE_NAME === 'athathy'
      ? 'https://api.athathy.ae/api/v1'
      : 'https://www.ecommerce.riolabz.com/api/v1',
}

const prod = {
  API_ENDPOINT_URL:
    SITE_NAME === 'zapkart'
      ? 'https://api.zapkart.com/api/v1'
      : SITE_NAME === 'athathy'
      ? 'https://api.athathy.ae/api/v1'
      : 'https://www.ecommerce.riolabz.com/api/v1',
}

const test = {
  API_ENDPOINT_URL:
    SITE_NAME === 'zapkart'
      ? 'https://www.ecommerce.riolabz.com/api/v1'
      : SITE_NAME === 'athathy'
      ? 'https://api.athathy.ae/api/v1'
      : 'https://www.ecommerce.riolabz.com/api/v1',
}

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev
    case 'production':
      return prod
    case 'test':
      return test
    default:
      break
  }
}

export const env = getEnv()
