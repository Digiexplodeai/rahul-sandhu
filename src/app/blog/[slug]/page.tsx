import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogs, getBlogBySlug } from "@/lib/queries";
import { FadeUp, ImageReveal, SectionEntrance } from "@/components/ui/motion";



interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Dr. Rahul Sandhu Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) notFound();

  const allBlogs = getBlogs();
  const related = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 2);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAFBF9]">
      <TopBar />
      <Navbar />

      {/* Article Header */}
      <article className="py-12 lg:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#142B3D] hover:text-[#17665F] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Category & Title */}
        <FadeUp delay={0.05}>
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#EEF2F1] text-[#17665F] text-xs font-semibold uppercase tracking-wider">
              {blog.category || "Cancer Care"}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#142B3D] leading-tight tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C707A] pt-2 border-b border-[#E2E7E4] pb-5">
              <span className="flex items-center gap-1.5 font-medium text-[#142B3D]">
                <User className="w-4 h-4 text-[#17665F]" />
                <span>{blog.author || "Lt Col (Dr) Rahul Sandhu"}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#17665F]" />
                <span>{blog.published_date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#17665F]" />
                <span>{blog.read_time || "5 min read"}</span>
              </span>
            </div>
          </div>
        </FadeUp>

        {/* Cover Image */}
        <ImageReveal delay={0.15}>
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-xs border border-[#E2E7E4] my-7 bg-[#EEF2F1]">
            <Image
              src={blog.cover_image || "/images/surgery-300x225.png"}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        </ImageReveal>

        {/* Article Body Content */}
        <FadeUp delay={0.2}>
          <div className="bg-white p-7 sm:p-10 rounded-2xl border border-[#E2E7E4] shadow-xs space-y-5 text-[#283941] text-base leading-relaxed">
            {blog.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#142B3D] pt-3 border-t border-[#E2E7E4]"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n- ").map((item) => item.replace("- ", ""));
                return (
                  <ul key={index} className="space-y-2 list-disc pl-5 text-[#283941]">
                    {items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-[#283941]/90 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </FadeUp>

        {/* Author Box */}
        <FadeUp delay={0.25}>
          <div className="my-8 p-6 rounded-xl bg-white border border-[#E2E7E4] flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xs">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#E2E7E4] shrink-0">
              <Image
                src="/images/Dr-Rahul-Sandhu-original.jpeg"
                alt="Lt Col (Dr) Rahul Sandhu"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#17665F] block">
                About the Author
              </span>
              <h4 className="font-serif text-lg font-bold text-[#142B3D]">
                Lt Col (Dr) Rahul Sandhu
              </h4>
              <p className="text-xs text-[#5C707A] leading-relaxed">
                Surgical Oncologist with over 15 years experience in military medicine and cancer surgery. Fellowship trained at Homi Bhabha Cancer Hospital and Research Centre (Tata Memorial Centre network).
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Related Articles */}
        {related.length > 0 && (
          <FadeUp delay={0.3}>
            <div className="pt-6 border-t border-[#E2E7E4] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#142B3D]">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="p-5 rounded-xl bg-white border border-[#E2E7E4] hover:border-[#17665F]/40 hover:shadow-md -translate-y-0 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <h4 className="font-serif text-sm font-bold text-[#142B3D] group-hover:text-[#17665F] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#17665F] font-semibold uppercase tracking-wider">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeUp>
        )}
      </article>

      {/* Consultation Banner */}
      <section className="py-12 bg-[#142B3D] text-[#FAFBF9] overflow-hidden">
        <SectionEntrance>
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#FAFBF9]">
                Schedule a Clinical Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#D6DFE4]/80 mt-1">
                Have questions regarding surgery or treatment options? Speak directly with Dr. Rahul Sandhu.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-[#17665F] hover:bg-[#124F4A] text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#45DDC8]/30"
            >
              Book Consultation
            </Link>
          </div>
        </SectionEntrance>
      </section>


      <Footer />
    </main>
  );
}
