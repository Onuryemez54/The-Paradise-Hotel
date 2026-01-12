import { RegisterForm } from '@/components/auth/RegisterForm';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';

export default function RegisterPage() {
  return (
    <CustomAuthModal mode="register">
      <RegisterForm />
    </CustomAuthModal>
  );
}
