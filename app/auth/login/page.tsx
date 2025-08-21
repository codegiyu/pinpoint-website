import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import Footer from '@/components/layout/Footer';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoginForm } from '@/components/sections/forms/LoginForm';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';

export default function LoginPage() {
  return (
    <MainLayout pageName="Login">
      <FormPageHeadingSection heading="Login" texts={[]} />
      <LoginForm />
      <Footer />
      <PageSideDecoration caption="Login" />
    </MainLayout>
  );
}
