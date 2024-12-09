import { Button, Card, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useSerName, password } from "../../global";
//@ts-ignore
import CryptoJS from "crypto-js";

const Auth: React.FC<any> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const login = (values: any) => {
    const passwordMD5 = CryptoJS.MD5(values.password).toString();
    if (values.username === useSerName && passwordMD5 === password) {
      setIsLogin(true);
    } else {
      message.error("用户名或密码错误");
    }
  };

  if (!isLogin) {
    return (
      <div className="login-card">
        <Card title="请登录" style={{ width: 400 }}>
          <Form layout="vertical" onFinish={login}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Button
              style={{ marginTop: 50 }}
              type="primary"
              block
              htmlType="submit"
            >
              登录
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
  return children;
};

export default Auth;
