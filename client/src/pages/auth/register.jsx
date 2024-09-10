import CommonForm from '@/components/common/form'
import { registerFormControl } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const initialState = {
    username: "",
    email: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function onSubmit(event){
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if(data?.payload?.success) navigate ('/auth/login')
    })
    
  }
  

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
        <p className="mt-2">
          Already have account
          <Link to="/auth/login" className="font-medium ml-2 text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

    </div>
  )
}

export default Register