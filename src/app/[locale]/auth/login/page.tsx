import { LoginForm } from '@/components/auth/LoginForm';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';

const LoginPage = () => {
  return (
    <CustomAuthModal mode="login">
      <LoginForm />
    </CustomAuthModal>
  );
};

export default LoginPage;
