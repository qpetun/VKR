import { WaveBackground } from '../components/WaveBackground';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <WaveBackground />
      <LoginForm />
    </div>
  );
}
