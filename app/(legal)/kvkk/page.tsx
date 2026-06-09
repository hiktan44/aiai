import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
};

export default function KvkkPage() {
  return (
    <>
      <h1>KVKK Aydınlatma Metni</h1>
      <p>Son güncelleme: 8 Haziran 2026</p>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, veri sorumlusu
        sıfatıyla LinkSpark tarafından kişisel verilerinizin işlenmesine ilişkin esaslar aşağıda
        açıklanmıştır.
      </p>

      <h2>İşlenen Kişisel Veriler</h2>
      <ul>
        <li>Kimlik ve iletişim verileri (ad, e-posta)</li>
        <li>İşlem güvenliği verileri (hash&apos;lenmiş IP, oturum bilgileri)</li>
        <li>Müşteri işlem verileri (oluşturulan linkler, kullanım istatistikleri)</li>
      </ul>

      <h2>İşleme Amaçları</h2>
      <p>
        Verileriniz; hizmetin sunulması, sözleşmesel yükümlülüklerin yerine getirilmesi, analitik
        raporlamanın oluşturulması ve yasal yükümlülüklere uyum amacıyla işlenir.
      </p>

      <h2>Haklarınız</h2>
      <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
        <li>Silinmesini veya yok edilmesini talep etme</li>
      </ul>

      <h2>Başvuru</h2>
      <p>
        Haklarınızı kullanmak için kvkk@linkspark.app adresine yazılı başvuruda bulunabilirsiniz.
      </p>
    </>
  );
}
