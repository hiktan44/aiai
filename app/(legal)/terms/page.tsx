import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları',
  description: 'LinkSpark kullanım koşulları.',
};

export default function TermsPage() {
  return (
    <>
      <h1>Kullanım Koşulları</h1>
      <p>Son güncelleme: 8 Haziran 2026</p>
      <p>
        LinkSpark hizmetlerini kullanarak aşağıdaki koşulları kabul etmiş olursunuz. Lütfen
        dikkatlice okuyun.
      </p>

      <h2>Hizmetin Kullanımı</h2>
      <p>
        LinkSpark&apos;ı yalnızca yasal amaçlarla kullanabilirsiniz. Spam, kötü amaçlı yazılım
        dağıtımı, phishing veya yanıltıcı yönlendirmeler için kısa link oluşturmak kesinlikle
        yasaktır.
      </p>

      <h2>Hesap Sorumluluğu</h2>
      <ul>
        <li>Hesap güvenliğinizden ve şifrenizden siz sorumlusunuz.</li>
        <li>Hesabınız altında gerçekleşen tüm etkinliklerden sorumlusunuz.</li>
        <li>Yetkisiz erişim durumunda derhal bizi bilgilendirmelisiniz.</li>
      </ul>

      <h2>Abonelik ve Ödeme</h2>
      <p>
        Ücretli planlar aylık veya yıllık olarak faturalandırılır. İstediğiniz zaman planınızı
        yükseltebilir veya iptal edebilirsiniz; iptal mevcut faturalandırma dönemi sonunda geçerli
        olur.
      </p>

      <h2>Hizmet Değişiklikleri</h2>
      <p>
        Hizmeti geliştirmek için özelliklerde değişiklik yapma hakkını saklı tutarız. Önemli
        değişiklikler önceden bildirilir.
      </p>
    </>
  );
}
