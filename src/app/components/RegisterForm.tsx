import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { InputField } from './InputField';
import { PasswordInputField } from './PasswordInputField';
import { PrimaryButton } from './PrimaryButton';

export function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', { name, email, password, confirmPassword });
    // Здесь будет логика регистрации
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <Logo />
        
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-8">
          Регистрация
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={User}
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            icon={Mail}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInputField
            icon={Lock}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInputField
            icon={Lock}
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showToggle={true}
          />

          <div className="text-left text-sm text-gray-600">
            Регистрируясь, вы соглашаетесь с{' '}
            <a
              href="#"
              className="text-[#4a8cc9] hover:text-[#3d7ab5] transition-colors underline"
            >
              условиями использования
            </a>
          </div>

          <PrimaryButton type="submit">
            Зарегистрироваться
          </PrimaryButton>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#4a8cc9] hover:text-[#3d7ab5] font-medium transition-colors"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}
