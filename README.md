# Akıllı Giysi Sağlık Monitörü

Akıllı Giysi Sağlık Monitörü, giyilebilir sağlık teknolojileri için tasarlanmış mobil öncelikli bir web arayüzü prototipidir. Uygulama; EKG görünümü, durum göstergeleri, senaryo tabanlı ekranlar ve profil yönetimi deneyimini gösterir.

## Özellikler

- Canvas tabanlı canlı EKG görselleştirmesi
- Nabız ve stres durumu kartları
- Farklı durum senaryolarına göre değişen arayüz akışları
- Tarayıcıda saklanan profil ve acil kişi formu
- Mobil cihazlara uyumlu görünüm ve masaüstünde iPhone kasa çerçevesi
- Kurulum gerektirmeyen, statik web yapısı

## Çalıştırma

Index.html dosyasını modern bir tarayıcıda açabilirsiniz. Manifest davranışını yerelde denemek için projeyi basit bir HTTP sunucusuyla çalıştırın:

~~~powershell
python -m http.server 8080
~~~

Ardından [http://localhost:8080](http://localhost:8080) adresini açın.

## Demo kapsamı

Bu proje bir arayüz prototipidir. Ekrandaki ölçümler, EKG grafikleri ve uyarılar sentetik veriye dayanır; gerçek sensör, cihaz bağlantısı, Bluetooth iletişimi, fiziksel titreşim veya acil bildirim hizmeti içermez.

Tıbbi tanı, tedavi kararı veya acil müdahale amacıyla kullanılmamalıdır. Profil denemelerinde gerçek kişisel ya da sağlık bilgisi girilmemelidir.

## Belgeler

- [Patent belgesi](docs/patent/TR-2026-008928-A2.pdf)
- [Patent belgesi kullanım notu](PATENT-NOTICE.md)

## Lisans

Bu depodaki yazılım kaynak kodu [MIT Lisansı](LICENSE) ile sunulur. Patent PDF'si ve patent hakları bu yazılım lisansının kapsamı dışındadır.
