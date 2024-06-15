"use client"
import React, { useEffect, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';


export default function page(props: any) {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  type FieldType = {
    email?: String;
    password?: String;
  };
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  useEffect(() => {
    if (props.values) {
      const { email, password } = props.values;
      console.log('Email:', email, 'Password:', password);

      const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailValidationRegex.test(email);
      const isPasswordNotEmpty = password && password.trim().length > 0;

      console.log('Is Email Valid:', isEmailValid, 'Is Password Not Empty:', isPasswordNotEmpty);


      if (isEmailValid && isPasswordNotEmpty) {
        console.log(isEmailValid)
        setClientReady(true);
      } else {
        setClientReady(false);
      }
    } else {
      console.log('undefined props');
      setClientReady(false);
    }
  }, [props.values]);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    const response = await fetch('/api/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password


      })
    })
    if (response.ok) {
      const data = await response.json();
      console.log('succuss data has been submited', data)
    } else {
      console.log("Failed to submit data")
    }
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className=' h-screen'>
      <div className=' p-4  ' style={{ maxWidth: "1020px", minHeight: "400px",display : 'flex',justifyContent : 'center',alignItems : 'center' }}>
        <div className="flex flex-col">
          <div className='p-4 text-center'>
            <p  className='font-bold'>Connexion</p>
            <p className='text-sm text-sm'>Continuer vers votre compte
            </p>
          </div>
          <Form style={{flexDirection : 'column'}} form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    clientReady ||
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  Log in
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
