import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { InputField } from './InputField';
import { PrimaryButton } from './PrimaryButton';

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Здесь будет логика входа
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <Logo />
        
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-8">
          Вход в систему
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={Mail}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            icon={Lock}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-left">
            <a
              href="#"
              className="text-sm text-[#4a8cc9] hover:text-[#3d7ab5] transition-colors"
            >
              Забыли пароль?
            </a>
          </div>

          <PrimaryButton type="submit">
            Войти
          </PrimaryButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Нет аккаунта?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-[#4a8cc9] hover:text-[#3d7ab5] font-medium transition-colors"
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
}