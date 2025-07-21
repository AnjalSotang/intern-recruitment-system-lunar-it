import React from 'react';

const Map = () => {
  return (
    <section className="bg-gray-100 rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Visit Our Office
      </h3>
      <p className="text-gray-600 mb-6">
        Located at 6 हटिया लाइन, इटहरी 56705, Nepal
      </p>

      <div className="w-full max-w-4xl mx-auto h-[450px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.6223418167465!2d87.2768404!3d26.6605717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6d8b1d73da1d%3A0xd4d57514869ca946!2sLunar%20IT%20Solution%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1752809892016!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Lunar IT Solution Pvt. Ltd., 6 हटिया लाइन, इटहरी 56705
      </p>
    </section>
  );
};

export default Map;
