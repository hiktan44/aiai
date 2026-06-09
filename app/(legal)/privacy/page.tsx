import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'LinkSpark gizlilik politikası ve veri işleme esasları.',
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Gizlilik Politikası</h1>
      <p>Son güncelleme: 8 Haziran 2026</p>
      <p>
        LinkSpark olarak gizliliğinize değer veriyoruz. Bu politika, hizmetlerimizi kullanırken
        topladığımız verileri ve bunları nasıl işlediğimizi açıklar.
      </p>

      <h2>Topladığımız Veriler</h2>
      <ul>
        <li>Hesap bilgileri (ad, e-posta adresi)</li>
        <li>Oluşturduğunuz kısa linkler ve hedef URL&apos;ler</li>
        <li>Tıklama analitiği (anonimleştirilmiş): cihaz, tarayıcı, coğrafi bölge, referrer</li>
        <li>Faturalandırma bilgileri (ödeme sağlayıcısı üzerinden)</li>
      </ul>

      <h2>Verileri Nasıl Kullanırız</h2>
      <p>
        Verilerinizi yalnızca hizmeti sunmak, analitik panellerinizi oluşturmak ve hesabınızı
        yönetmek için kullanırız. Verilerinizi üçüncü taraflarla pazarlama amacıyla paylaşmayız.
      </p>

      <h2>IP Adresleri ve Anonimleştirme</h2>
      <p>
        Tıklama olaylarında IP adresleri ham olarak saklanmaz; tek yönlü hash&apos;leme ile
        anonimleştirilir. Bu sayede tekil ziyaretçi sayımı yapılırken kişisel veri korunur.
      </p>

      <h2>İletişim</h2>
      <p>
        Gizlilikle ilgili sorularınız için privacy@linkspark.app adresinden bize ulaşabilirsiniz.
      </p>
    </>
  );
}
