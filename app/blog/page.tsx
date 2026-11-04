export const metadata = { title: "Blog — Pojok Foto" };

const POSTS = [
  ["Lima pose photostrip yang selalu jadi", "Mulai dari pose santai: saling bersandar, satu foto serius, satu foto tertawa, satu foto saling menunjuk, dan satu foto kejutan. Variasi antar bingkai membuat strip terasa seperti cerita pendek, bukan empat foto yang sama."],
  ["Cara mencetak photostrip di rumah", "Pilih hasil cetak 2 strip berdampingan, unduh PDF, lalu cetak di kertas A4 dengan skala 100 persen. Gunting mengikuti tepi strip. Kertas foto doff memberi kesan film yang lebih hangat dibanding kertas biasa."],
  ["Memilih filter film yang pas", "Kodak 200 hangat dan cocok untuk wajah dan makanan. Fuji 400 lebih dingin dan tenang. Tri-X hitam putih berbutir, bagus untuk cahaya redup. Fade 90an cocok untuk suasana nostalgia."],
];

export default function Blog() {
  return (
    <section>
      <h1>Blog</h1>
      <p className="lead">Tips singkat untuk hasil photobooth yang lebih enak dilihat.</p>
      <div className="posts">
        {POSTS.map(([t, d]) => (
          <article key={t}><h2>{t}</h2><p>{d}</p></article>
        ))}
      </div>
    </section>
  );
}
