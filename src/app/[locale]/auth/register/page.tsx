import { RegisterForm } from '@/components/auth/RegisterForm';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';

const RegisterPage = () => {
  return (
    <CustomAuthModal mode="register">
      <RegisterForm />
    </CustomAuthModal>
  );
};

export default RegisterPage;
