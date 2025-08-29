import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";

const { Option } = Select;

interface TransactionFormProps {
  onFinish: (values: any) => void;
  isLoading: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onFinish, isLoading }) => {
  const [form] = Form.useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateDescription = (_: any, value: string) => {
    if (!value) return Promise.resolve();
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(value)) {
      return Promise.reject(new Error("Description can only contain letters and spaces"));
    }
    return Promise.resolve();
  };

  const validateAccountNumber = (_: any, value: string) => {
    if (!value) return Promise.reject(new Error("Please enter account number"));
    const regex = /^\d{8,}$/;
    if (!regex.test(value)) {
      return Promise.reject(new Error("Account number must be at least 8 digits and numbers only"));
    }
    return Promise.resolve();
  };

  const validateAmount = (_: any, value: string) => {
    if (!value) return Promise.reject(new Error("Amount is required"));
    const num = Number(value);
    if (isNaN(num)) return Promise.reject(new Error("Amount must be a number"));
    if (num < 50) return Promise.reject(new Error("Amount must be at least 50"));
    return Promise.resolve();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      form.setFieldsValue({ amount: value });
    }
  };

  const checkFormValid = () => {
    const hasErrors = form.getFieldsError().some(field => field.errors.length > 0);
    const values = form.getFieldsValue();
    const requiredEmpty = !values.beneficiaryAccNo || !values.beneficiaryBankName || !values.amount || !values.description;
    setIsButtonDisabled(hasErrors || requiredEmpty);
  };

  useEffect(() => {
    checkFormValid();
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFieldsChange={checkFormValid}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            label="Account Number"
            name="beneficiaryAccNo"
            rules={[{ validator: validateAccountNumber }]}
          >
            <Input
              placeholder="Account number"
              maxLength={20}
              onKeyDown={(e) => {
                if (!/[\d]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Form.Item
            label="Beneficiary Bank"
            name="beneficiaryBankName"
            rules={[{ required: true, message: "Please select a bank" }]}
          >
            <Select placeholder="Select bank">
              <Option value="hnb">HNB</Option>
              <Option value="boc">BOC</Option>
              <Option value="commercial">Commercial Bank</Option>
              <Option value="sampath">Sampath Bank</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ validator: validateAmount }]}
          >
            <Input
              placeholder="0.00"
              onChange={handleAmountChange}
              onKeyDown={(e) => {
                if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, validator: validateDescription }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full md:w-auto"
          disabled={isButtonDisabled}
          loading={isLoading}
        >
          Transfer
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;