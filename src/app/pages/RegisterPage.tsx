import { DiagonalWaveBackground } from '../components/DiagonalWaveBackground';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <DiagonalWaveBackground />
      <RegisterForm />
    </div>
  );
}
