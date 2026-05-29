import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { ColorPickerContent } from '@/components/color-picker/ColorPickerContent';
import { MainLayout } from '@/components/layout/MainLayout';

export default function ColorPickerPage() {
  return (
    <MainLayout pageName="Color Picker">
      <ColorPickerContent />
      <PageSideDecoration caption="Color Picker" />
    </MainLayout>
  );
}
