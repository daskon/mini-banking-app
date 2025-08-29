import { Alert, Button, Spin } from "antd";
import { useMeQuery } from "../services/auth/authServiceApi";
import { useGetAccountsQuery, useTransferMoneyMutation } from "../services/account/accountServiceApi";
import Card from "../components/Card";
import { useLogoutMutation } from "../services/auth/authServiceApi";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import { useState } from "react";

const Dashboard = () => {
    const { data: me, isLoading: userLoading } = useMeQuery();
    const { data: accounts, isLoading: accountsLoading, refetch } = useGetAccountsQuery(
        me?.user.id!,
        {skip: !me}
    );
    const [transferMoney, { isLoading}] = useTransferMoneyMutation();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleLogout = async () => {
        await logout().unwrap();
        navigate("/");
    };

    if (userLoading || accountsLoading || isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );

    const handleTransfer = async (values: any) => {
        const fromAccountId = accounts?.map((each: any) => each.id)[0];
        const payload = {
            ...values,
            fromAccountId,
            beneficiaryAccNo: Number(values.beneficiaryAccNo),
            amount: Number(values.amount),
        }
        try {
            const response = await transferMoney(payload).unwrap();
            if (response.success) {
                setAlert({ type: "success", message: response.message || "Transfer successful!" });
                refetch();
            }
        } catch (error: any) {
            setAlert({ type: "error", message: error?.data?.error || "Something went wrong!" });
        }
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {me?.user.username}</h1>
        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </div>

        <Card title="Account Summary">
            {accounts && accounts.length > 0 ? (
                accounts.map((account) => (
                    <div
                        key={account.id}
                        className="flex justify-between bg-gray-50 p-4 rounded-lg mb-2"
                    >
                        <span>Account No: {account.id}</span>
                        <span>Balance: ${account.balance}</span>
                    </div>
                ))
            ) : (
                <p>No accounts available.</p>
            )}
        </Card>

        <Card title="Quick Transfer" className="w-full">
            {alert && <Alert type={alert.type} message={alert.message} showIcon closable onClose={() => setAlert(null)} />}
            <TransactionForm onFinish={handleTransfer} isLoading={isLoading} />
        </Card>

        <Card title="Recent Transactions">
        {accounts && accounts.length > 0 ? (
            <div className="space-y-2">
                <div className="flex justify-between font-bold bg-gray-200 p-3 rounded-lg">
                    <span>Date</span>
                    <span>Bank</span>
                    <span>Account No</span>
                    <span>Amount</span>
                    <span>Type</span>
                </div>
            {accounts.map((account) =>
                account.transactions.slice(0, 5).map((tx) => (
                <div
                    key={tx.id}
                    className="flex justify-between bg-gray-50 p-3 rounded-lg"
                >
                    <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
                    <span>{tx.beneficiaryBankName}</span>
                    <span>{tx.beneficiaryAccNo}</span>
                    <span>${tx.amount}</span>
                    <span>{tx.type}</span>
                </div>
                ))
            )}
                </div>
            ) : (
                <p>No transactions found.</p>
            )}
        </Card>
    </div>
  );
};

export default Dashboard;