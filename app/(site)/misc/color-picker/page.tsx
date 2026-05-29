import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { ColorPickerContent } from '@/components/color-picker/ColorPickerContent';
import { MainLayout } from '@/components/layout/MainLayout';
import { COLOR_PICKER_DEFAULT_QUERY } from '@/lib/constants/color-picker';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{ colors?: string }>;
}

export default async function ColorPickerPage({ searchParams }: Props) {
  const { colors } = await searchParams;

  if (!colors?.trim()) {
    redirect(`/misc/color-picker?colors=${COLOR_PICKER_DEFAULT_QUERY}`);
  }

  return (
    <MainLayout pageName="Color Picker">
      <ColorPickerContent />
      <PageSideDecoration caption="Color Picker" />
    </MainLayout>
  );
}
