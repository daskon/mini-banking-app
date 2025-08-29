import { Alert, Button, Form, Input, message } from "antd"
import { useLoginMutation } from "../services/auth/authServiceApi"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ErrorHandler } from "../utils/errorHandler";

export const Login = () => {

    const [login, {isLoading, isError, isSuccess, error}] = useLoginMutation();
    const navigate = useNavigate();

    const onSubmit = async (values: { username: string, password: string}) => {
        try{
            await login(values).unwrap();
            navigate("/dashboard");
        } catch (err: any) {
           ErrorHandler.handleApiError(err);
        }
    }

    useEffect(() => {
        if (isSuccess) {
        navigate("/dashboard");
        }
    }, [isSuccess]);

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 px-4">
        <div className="w-full max-w-md rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12
                  bg-gradient-to-br from-white/80 via-white/60 to-white/30
                  shadow-lg backdrop-blur-md">
            <h2 className="font-bold text-2xl text-center mb-6">User Login</h2>
            {isError && <Alert message={(error as any)?.data?.message || "Login failed"} type="error"/>}
            <Form layout="vertical" onFinish={onSubmit}>
                <Form.Item name="username" label="Username" rules={[{required: true}]}>
                    <Input placeholder="Enter username" />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{required: true}]}>
                    <Input.Password placeholder="Enter password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  )
}
