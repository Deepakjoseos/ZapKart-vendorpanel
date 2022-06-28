import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import fetch from 'auth/FetchInterceptor'
import { Button, Card, Col, Input, Modal, notification, Row } from 'antd'
import { auth, currentUser } from 'auth/FirebaseAuth'
import firebase from 'firebase/app'
import { authenticated } from 'redux/actions/Auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import authVendorService from 'services/auth/vendor'

const AuthDetails = () => {
  const [phoneVerificationOtp, setPhoneVerificationOtp] = useState(null)

  const [showPhoneOtpModal, setShowPhoneOtpModal] = useState(false)

  const captchaCont = useRef(null)

  // Phonenumber
  const [phoneVerified, setPhoneVerified] = useState(false)

  const [currentUserFormData, setCurrentUserFormData] = useState({})
  const [userAlreadyExistInDB, setUserAlreadyExistInDB] = useState(false)
  const [isPasswordRegister, setIsPasswordRegister] = useState(false)

  const [showEmailVerificationScreen, setEmailVerificationScreen] =
    useState(false)

  // Email

  const history = useHistory()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    // email: Yup.string().email('*Invalid Email').required('* Email Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    // displayImage: Yup.string().required('* Password Required'),
    // phone: Yup.string().required('Phone Number Required'),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('password'), null], '* Passwords must match')
    //   .required('* Password Confirm Required'),
  })

  useEffect(() => {
    const getProfile = async () => {
      // console.log(newToken, 'the-new-token')

      try {
        const { data } = await fetch({
          url: '/vendors',
          method: 'get',
        })
        setCurrentUserFormData({
          email: data.email || '',
          phone: data?.phone?.slice(3) || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          displayImage: data.displayImage,
        })
        setUserAlreadyExistInDB(true)

        if (
          user.emailVerified &&
          user.phoneVerified &&
          data.firstName &&
          data.lastName
        ) {
          notification.success({ message: 'User Fully Authenticated' })
          history.replace('/')
        }

        if (!user.emailVerified) {
          setEmailVerificationScreen(true)
        }

        console.log(data, 'profile-data')
      } catch (err) {
        // if (err.response.data.status === 401) {
        console.log(user, 'sjowww')
        setCurrentUserFormData({
          email: user.email || '',
          phone: user?.phone?.slice(3) || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          displayImage: user.displayImage,
        })
        setUserAlreadyExistInDB(false)
        // } else {
        //   //   notification.error(err.response.data.message)
        // }
      }

      // await dispatch(setToken(newToken))
    }
    console.log('the-user', user)
    getProfile()

    const passwordAvailable = auth.currentUser.providerData?.find(
      (cur) => cur.providerId === 'password'
    )
    setIsPasswordRegister(
      passwordAvailable?.providerId === 'password' ? true : false
    )

    setPhoneVerified(user.phoneVerified)
  }, [user])

  const updateUserEmail = async (email) => {
    try {
      await currentUser.updateEmail(email)
      notification.success({ message: 'Email Linked Success' })
    } catch (err) {
      notification.error({ message: err.message })
      return 'error'
    }
  }

  const emailVerification = async (email) => {
    //Email Verification
    console.log('the-email', email)
    try {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          notification.success({
            message: `Email is sent to ${email}. Click the link to complete your Verification.`,
          })
          return true
        })
    } catch (err) {
      notification.error({ message: err.message })
    }
  }

  // Link phonenumber
  const linkPhoneNumber = (phoneNumber) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
        }
      )
    }
    window.recaptchaVerifier.render()

    console.log(phoneNumber, 'heyyyy')

    firebase
      .auth()
      .currentUser.linkWithPhoneNumber(
        `+91 ${phoneNumber}`,
        window.recaptchaVerifier
      )
      .then(function (confirmationResult) {
        console.log(confirmationResult, 'plsss')
        notification.success({ message: 'Otp sent to your phone number' })
        setShowPhoneOtpModal(true)
        // Ask user to provide the SMS code.
        // var code = window.prompt('Enter your OTP here')
        // return confirmationResult.confirm(code)

        window.confirmationResult = confirmationResult
      })
      .catch((err) => {
        setPhoneVerified(false)
        setShowPhoneOtpModal(false)
        notification.error({ message: err.message })
        console.log(err)
      })
  }

  const otpSubmit = async () => {
    try {
      const res = await window.confirmationResult.confirm(phoneVerificationOtp)
      notification.success({ message: 'Phone Number Linked Successfully' })

      //   dispatch(
      //     authenticated({
      //       user: { ...user, phoneVerified: true },
      //       token: window.localStorage.getItem('auth_token'),
      //     })
      //   )
      setPhoneVerified(true)
      setShowPhoneOtpModal(false)
    } catch (err) {
      setPhoneVerified(false)
      setShowPhoneOtpModal(false)
      notification.error({ message: err.message })
    }
  }

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    // const imgValue = await singleImageUploader(
    //   values.image[0].originFileObj,
    //   values.image,
    //   values.image[0].url,
    // )
    // values.image = imgValue
    // Verifying Email and password
    const { password } = values
    const curUser = firebase.auth().currentUser

    const email = curUser.email
    const emailVerified = curUser.emailVerified
    const phoneNumberVerified = curUser.phoneNumber

    console.log(emailVerified, 'showww')

    if (phoneNumberVerified) {
      // if (emailExist) {
      //   values.email = emailExist
      // }

      if (!email) {
        const res = await updateUserEmail(values.email)
        if (res === 'error') {
          return
        }
      }
      if (!emailVerified) {
        const sendingEmail = email || values.email
        await emailVerification(sendingEmail)
      }

      //   const imgValue = await singleImageUploader(values.displayImage)
      //   values.displayImage = imgValue

      const sendingValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        displayImage: curUser.displayImage,
      }

      if (!userAlreadyExistInDB) {
        try {
          const res = await authVendorService.createVendor(sendingValues)

          const idTokenResult = await curUser.getIdTokenResult(true)
          window.localStorage.setItem('auth_token', idTokenResult.token)

          const data = await authVendorService.getProfile()

          const dispatchingData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            displayImage: data.displayImage,
            emailVerified: emailVerified,
            phoneVerified: user.phoneNumber ? true : false,
          }

          await dispatch(
            authenticated({
              user: dispatchingData,
              token: idTokenResult.token,
            })
          )

          if (res) {
            notification.success({ message: 'Authentication Success: Create' })
            notification.success({ message: 'User Fully Authenticated' })
            // window.location.href = '/'
            history.push('/')
          }
        } catch (err) {
          console.log('err', err)
          //   toast.error(err.response.data.message)
        }
      } else {
        try {
          const res = await authVendorService.editProfile(sendingValues)

          const idTokenResult = await curUser.getIdTokenResult(true)
          window.localStorage.setItem('auth_token', idTokenResult.token)

          const data = await authVendorService.getProfile()

          const dispatchingData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            displayImage: data.displayImage,
            emailVerified: emailVerified,
            phoneVerified: user.phoneNumber ? true : false,
          }

          await dispatch(
            authenticated({
              user: dispatchingData,
              token: idTokenResult.token,
            })
          )

          if (res) {
            notification.success({ message: 'Authentication Success: Edit' })
            notification.success({ message: 'User Fully Authenticated' })

            // window.location.href = '/'
            history.push('/')
          }
        } catch (err) {
          //   toast.error(err.response.data.message)
          console.log('err', err)
        }
      }
    } else {
      notification.error({ message: 'You need To Verify your phone Number' })
    }
  }

  const onEmailVerificationBtnHandler = async () => {
    await emailVerification(firebase.auth().currentUser.email)
    history.push('/')
  }

  return (
    <>
      {!showEmailVerificationScreen ? (
        <div>
          <Formik
            initialValues={currentUserFormData}
            onSubmit={onSubmitHandler}
            enableReinitialize={true}
            validationSchema={validationSchema}
          >
            {(fomrik) => {
              const { touched, errors, isSubmitting, values, setFieldValue } =
                fomrik

              console.log(values, 'values')

              return (
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={17}>
                    <Card title="User Details" className="p-3">
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="firstName">First Name</label>
                          <Field
                            as={Input}
                            className="first-name-signup form-control"
                            type="text"
                            name="firstName"
                            style={{
                              border: `${
                                touched.firstName && errors.firstName
                                  ? '1px solid red'
                                  : ''
                              }`,
                            }}
                          />
                          <ErrorMessage name="firstName" />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="lastName">Last Name</label>
                          <Field
                            as={Input}
                            type="text"
                            name="lastName"
                            className="form-control"
                            style={{
                              border: `${
                                touched.lastName && errors.lastName
                                  ? '1px solid red'
                                  : ''
                              }`,
                            }}
                          />
                          <ErrorMessage name="lastName" />
                        </div>
                        {/* <div className="form-group">
                  <label htmlFor="displayImage">Display Image</label>
                  <ImageUploader
                    source={values.displayImage ? values.displayImage : null}
                    name="displayImage"
                    setSource={setFieldValue}
                  />
  
                  <ErrorMessage name="displayImage" component={ErrorText} />
                </div> */}
                        {/* OTP => PHONE VERIFICATION */}
                        {/* {!user.phoneVerified && !phoneVerified ? ( */}
                        <>
                          <div>
                            <label htmlFor="phone">Phone</label>
                            <Field
                              as={Input}
                              type="phone"
                              name="phone"
                              value={values.phone}
                              className="form-control"
                              disabled={phoneVerified}
                              style={{
                                border: `${
                                  touched.phone && errors.phone
                                    ? '1px solid red'
                                    : ''
                                }`,
                              }}
                            />
                            <ErrorMessage name="phone" />
                          </div>
                          {!phoneVerified && (
                            <p
                              onClick={() => {
                                if (values.phone?.length === 10) {
                                  linkPhoneNumber(values.phone)
                                } else {
                                  notification.error({
                                    message: 'Please Enter Valid Phone Number',
                                  })
                                }
                              }}
                              style={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                marginBottom: '10px',
                              }}
                            >
                              Verify PhoneNumber
                            </p>
                          )}
                        </>
                        <div className="mb-3">
                          <label htmlFor="lastName">Email</label>
                          <Field
                            as={Input}
                            type="email"
                            name="email"
                            className="form-control"
                            disabled={isPasswordRegister || user.emailVerified}
                            style={{
                              border: `${
                                touched.email && errors.email
                                  ? '1px solid red'
                                  : ''
                              }`,
                            }}
                          />
                          <ErrorMessage name="email" />
                        </div>

                        <div>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="btn w-100 mb-3"
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              )
            }}
          </Formik>

          <Modal
            title="Verify OTP"
            visible={showPhoneOtpModal}
            onCancel={() => setShowPhoneOtpModal(false)}
            footer={null}
            destroyOnClose
            maskClosable={false}
          >
            <div className="form-group">
              <Input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="form-control mb-3"
                onChange={(e) => setPhoneVerificationOtp(e.target.value)}
              />
            </div>
            <Button type="primary" htmlType="button" onClick={otpSubmit}>
              Submit
            </Button>
          </Modal>
          <div id="recaptcha-container" ref={captchaCont}></div>
        </div>
      ) : (
        <Card title="Email Verification Pending">
          <h3>You need to verify your Email Address</h3>
          <Button
            type="primary"
            htmlType="button"
            className="btn"
            onClick={onEmailVerificationBtnHandler}
          >
            Verify Email Address
          </Button>
        </Card>
      )}
    </>
  )
}

export default AuthDetails
