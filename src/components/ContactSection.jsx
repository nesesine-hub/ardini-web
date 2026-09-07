const ADDRESS = "Bayar Plaza, Şeyh Sinan, İbrişim Sk., 59850 Çorlu/Tekirdağ";
const MAPS_QUERY = encodeURIComponent(
  "Bayar Ticari Yatırımlar Yapı Turizm Kimya San ve Tic Ltd Şti, Çorlu Tekirdağ"
);

export default function ContactSection() {
  return (
    <section id="iletisim" className="bg-cream-dark">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
          İletişim
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
          Sorularınız için bize ulaşın veya showroom'umuzu ziyaret edin.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <h3 className="text-lg font-semibold text-charcoal">
              Bayar Ticari Yatırımlar
            </h3>
            <p className="text-sm text-gray-500">
              Yapı Turizm Kimya San. ve Tic. Ltd. Şti.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-sky">📍</span>
                <span className="text-sm text-gray-600">{ADDRESS}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-sky">📞</span>
                <a
                  href="tel:+905493300900"
                  className="text-sm font-medium text-charcoal hover:text-emerald"
                >
                  0549 330 09 00
                </a>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Yol Tarifi Al
            </a>
          </div>

          <div className="min-h-[320px] w-full">
            <iframe
              title="Ardini Konum"
              src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
