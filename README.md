# Akıllı Giysi Sağlık Monitörü

Akıllı Giysi Sağlık Monitörü; giyilebilir biyosinyal izleme fikrini anlaşılır bir mobil arayüzde gösteren, statik bir web prototipidir. Uygulama, patent başvurusunda tanımlanan akıllı giysi sisteminin yazılım deneyimini; EKG görünümü, stres göstergesi, dokunsal geri bildirim temsili ve acil durum akışı üzerinden simüle eder.

Bu depo, donanım cihaz yazılımını ya da klinik bir sağlık ürününü değil, ürünün kullanıcıya dönük web arayüzü ve demo katmanını içerir.

## Patent başvurusuyla ilişki

Proje sahibi tarafından sağlanan patent belgesindeki yayınlanmış başvuru bilgileri:

| Alan | Bilgi |
| --- | --- |
| Başlık | Akıllı Giysi ve Dokunsal Biyogeribildirim Sistemi |
| Yayın numarası | TR 2026 008928 A2 |
| Başvuru numarası | 2026/008928 |
| Başvuru tarihi | 5 Haziran 2026 |
| Yayın tarihi | 22 Haziran 2026 |
| Tasnif | A61B 5/024, A61B 5/0245 |
| Başvuru sahibi | Edirne Merkez Yıldırım Beyazıt Anadolu Lisesi |
| Buluşu yapanlar | Berat Beşli, Gülnıhal Aktaş |

Başvuru; tekstile entegre elektrotlarla sürekli EKG ve HRV tabanlı stres takibini, ayrılabilir ana işlem modülünü, dokunsal uyarıyı, kablosuz mobil uygulama aktarımını ve acil durum bildirimini hedefler. Bu web uygulaması, aşağıdaki hedeflerin kullanıcı arayüzü tarafındaki prototipidir.

| Patent hedefi | Bu depodaki karşılığı | Mevcut durum |
| --- | --- | --- |
| EKG ve stres izleme | Canvas üzerinde anlık EKG görünümü, nabız ve stres kartları | Simüle edilmiş veri |
| Dokunsal biyogeribildirim | Titreşim deseni ve durum arayüzü | Görsel arayüz temsili |
| Mobil uygulama deneyimi | Mobil öncelikli ekranlar, safe-area desteği ve PWA metadatası | Uygulanmış |
| Kablosuz aktarım | ESP32/Bluetooth bağlantı durumu akışı | Görsel demo, gerçek bağlantı yok |
| Acil kişi bildirimi | Yakınlar ve 112 için bildirim akışı | Görsel demo, gerçek bildirim yok |

## Uygulama özellikleri

- P-QRS-T benzeri dalga üreten ve Canvas üzerinde akan EKG görselleştirmesi
- Nabız, stres seviyesi ve sistem durumu göstergeleri
- Normal, Panik Atak ve Kalp Krizi demo senaryoları
- Senaryoya göre değişen uyarı, titreşim ve acil durum ekranları
- Günlük ve haftalık eğilim grafikleri
- Acil kişi bilgileri dâhil olmak üzere tarayıcıda saklanan profil formu
- iPhone ve benzeri mobil ekranlar için safe-area, dinamik viewport ve dokunma odaklı düzen
- Masaüstünde yalnız telefon kasasını gösteren sabit iPhone çerçevesi
- Web uygulaması manifesti ve SVG uygulama simgesi

## Teknik yapı

Uygulama derleme adımı veya paket yöneticisi gerektirmeyen statik bir web projesidir.

| Dosya | Sorumluluk |
| --- | --- |
| [index.html](index.html) | Tüm HTML, CSS ve JavaScript; ekranlar, EKG simülasyonu, grafikler ve etkileşimler |
| [manifest.webmanifest](manifest.webmanifest) | Web uygulaması adı, renkleri, kapsamı ve standalone görüntüleme ayarları |
| [assets/akilli-giysi-icon.svg](assets/akilli-giysi-icon.svg) | Uygulama simgesi |

Arayüzde Inter yazı tipi Google Fonts üzerinden alınır. Uygulama verisi için sunucu, veritabanı veya hesap sistemi kullanılmaz.

## Çalıştırma

En kısa yol, [index.html](index.html) dosyasını modern bir tarayıcıda açmaktır. Manifest ve mobil kurulum davranışını daha sağlıklı denemek için projeyi basit bir yerel HTTP sunucusuyla çalıştırın:

~~~powershell
git clone https://github.com/beratbesli/akilligiysiapp.git
Set-Location akilligiysiapp
python -m http.server 8080
~~~

Ardından tarayıcıda [http://localhost:8080](http://localhost:8080) adresini açın.

Telefon ekranında uygulama tam ekran yerleşimi kullanır. Masaüstünde yeterli alan olduğunda aynı arayüz, dıştan bir iPhone kasası içinde gösterilir. Ana ekranın yatay olarak büyümemesi için çerçeve ve Canvas boyutları viewport'a göre sınırlandırılmıştır.

## Kullanım akışı

1. Açılışta kısa bağlantı demosunun tamamlanmasını bekleyin.
2. Ana ekranda anlık nabız, stres ve EKG görünümünü inceleyin.
3. Normal, Panik Atak veya Kalp Krizi senaryosunu seçerek demo davranışlarını görün.
4. Profil ekranından acil kişi bilgilerini girin ve kaydedin.
5. Kritik senaryoda ekrandaki acil bildirim akışını gözlemleyin.

## Gizlilik ve veri saklama

Profil alanları, yalnızca o tarayıcının localStorage alanında akilliGiysi_profile anahtarıyla saklanır. Bu sürümde veri şifreleme, kullanıcı hesabı, uzak sunucu veya bulut senkronizasyonu yoktur.

Bu nedenle demo sürümüne gerçek kimlik, sağlık veya acil iletişim bilgisi girilmemelidir. Kaydedilmiş test verilerini tarayıcının site verilerini temizleyerek silebilirsiniz.

## Bilinen sınırlar

Bu prototip, ürün fikrini ve arayüz akışını göstermeyi amaçlar. Aşağıdaki yetenekler bu depoda gerçek olarak uygulanmış değildir:

- Gerçek elektrot, EKG sensörü, HRV algoritması veya ESP32 bağlantısı
- Web Bluetooth, Wi-Fi aktarımı veya donanım sürücüsü
- Fiziksel haptik motor kontrolü
- SMS, arama, 112 veya acil kişilere gerçek bildirim gönderimi
- Gerçek hasta geçmişi, backend, kimlik doğrulama ve şifreli veri saklama
- Service worker tabanlı çevrimdışı kullanım

Ekrandaki EKG, geçmiş grafikler, kritik eşikler ve acil durumlar sentetik demo verileridir. Uygulama tıbbi tanı, tedavi kararı, klinik izleme veya acil müdahale amacıyla kullanılmamalıdır.

## Geliştirme için sonraki adımlar

1. ESP32 ile güvenli Bluetooth Low Energy haberleşmesi eklemek.
2. Sensör verisi için doğrulanmış EKG ve HRV işleme hattı oluşturmak.
3. Dokunsal motor sürücüsünü, eşik ve geri bildirim kurallarıyla entegre etmek.
4. Yetkilendirme, şifreleme ve veri saklama ilkelerini içeren güvenli bir backend tasarlamak.
5. Acil bildirim akışını ilgili mevzuat, izinler ve güvenilir iletişim servisleriyle doğrulamak.
6. Klinik doğrulama, erişilebilirlik ve güvenlik testlerini tamamlamak.

## Sürümleme

Bu depo, projenin Git tabanlı yedeği olarak özel bir GitHub deposunda sürümlenir. Her anlamlı değişiklik için açıklayıcı bir commit oluşturulması, geri dönüş ve izlenebilirlik için önerilir.
