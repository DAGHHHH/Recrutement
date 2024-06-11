"use client"
import React from 'react'
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Footer } from '@/components/Footer';

export default function page() {


  type FieldType = {
    email?: String;
    password?: String;
  };

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
    <div className='app flex justify-center items-center h-screen'>
      <div className='content p-4 ' style={{ maxWidth: "1020px", minHeight: "400px" }}>
        <div className="form-container">
          <div className='p-4 text-center'>
            <p className='font-bold'>Connexion</p>
            <p className='text-sm text-sm'>Continuer vers votre compte
            </p>
          </div>
          <Form className='w-96'
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label="email"
              name="email"
              rules={[{ required: true, message: "S'il vous plaît entrez votre email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "S'il vous plait entrez votre mot de passe!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className='' wrapperCol={{ offset: 8, span: 16 }}>
              <Button style={{ width: '250px' }} type="primary" htmlType="submit">
                Se Connecter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
