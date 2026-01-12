import { LoginForm } from '@/components/auth/LoginForm';
import { CustomAuthModal } from '@/components/auth/CustomAuthModal';

export default function LoginPage() {
  return (
    <CustomAuthModal mode="login">
      <LoginForm />
    </CustomAuthModal>
  );
}
